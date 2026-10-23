"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  ContactShadows,
  MeshDistortMaterial,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

// Generate realistic high-res front label texture via Canvas
function useBottleLabelTexture(mode: "studio" | "shield" | "thermal") {
  return useMemo(() => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Authentic TAF Energies Master Optima label based on user uploaded product
    if (mode === "thermal") {
      const grad = ctx.createLinearGradient(0, 0, 0, 1024);
      grad.addColorStop(0, "#FF2200");
      grad.addColorStop(0.5, "#FF6B00");
      grad.addColorStop(1, "#330000");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);
    } else if (mode === "shield") {
      const grad = ctx.createLinearGradient(0, 0, 0, 1024);
      grad.addColorStop(0, "#0F172A");
      grad.addColorStop(0.5, "#1E293B");
      grad.addColorStop(1, "#FF6B00");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);
    } else {
      // Authentic Blue Gradient Label as seen in real bottle
      const grad = ctx.createLinearGradient(0, 0, 0, 1024);
      grad.addColorStop(0, "#0284C7");
      grad.addColorStop(0.35, "#0369A1");
      grad.addColorStop(0.85, "#0F3D6E");
      grad.addColorStop(1, "#08254A");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Subtle engine mechanical background silhouette watermark
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.arc(350, 650, 220, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border frame
    ctx.strokeStyle = mode === "thermal" ? "#FFAA00" : "#38BDF8";
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, 964, 964);

    // Orange/Gold Circular Swirl Logo at Top Center
    ctx.save();
    ctx.translate(512, 170);
    const swirlGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 65);
    swirlGrad.addColorStop(0, "#FFB800");
    swirlGrad.addColorStop(0.7, "#FF6600");
    swirlGrad.addColorStop(1, "#D94E00");
    ctx.fillStyle = swirlGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 60, 0, Math.PI * 2);
    ctx.fill();
    // Inner swirl crescent
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(-8, -5, 32, 0.4, Math.PI * 1.6);
    ctx.stroke();
    ctx.restore();

    // Brand Name: TAF Energies PLC in Orange
    ctx.textAlign = "center";
    ctx.fillStyle = "#FF7A00";
    ctx.font = "900 66px sans-serif";
    ctx.fillText("TAF", 512, 285);
    ctx.font = "800 52px sans-serif";
    ctx.fillText("Energies PLC", 512, 345);

    // Product Title: Master Optima (White with Red outline)
    ctx.font = "900 88px sans-serif";
    ctx.strokeStyle = "#E11D48";
    ctx.lineWidth = 8;
    ctx.strokeText("Master Optima", 512, 455);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Master Optima", 512, 455);

    // Gasoline Engine Oil (Italicized black/dark navy)
    ctx.font = "italic 700 48px sans-serif";
    ctx.fillStyle = "#0F172A";
    ctx.fillText("Gasoline Engine Oil", 512, 530);

    // Viscosity Grade: 20W-50 in Bold Red
    ctx.fillStyle = "#DC2626";
    ctx.font = "900 120px sans-serif";
    ctx.fillText("20W-50", 512, 665);

    // API Grade: SM in Bold Red
    ctx.font = "900 72px sans-serif";
    ctx.fillText("SM", 512, 745);

    // QR Code Box on Left
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(80, 800, 130, 130);
    ctx.fillStyle = "#000000";
    // QR Code pattern simulation
    ctx.fillRect(92, 812, 38, 38);
    ctx.fillRect(160, 812, 38, 38);
    ctx.fillRect(92, 880, 38, 38);
    ctx.fillRect(145, 865, 20, 20);
    ctx.fillRect(170, 885, 25, 25);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 18px sans-serif";
    ctx.fillText("SCAN ME", 145, 955);

    // MADE IN UAE & 4 Litre on bottom
    ctx.textAlign = "left";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 36px sans-serif";
    ctx.fillText("MADE IN UAE", 240, 855);
    ctx.font = "700 32px sans-serif";
    ctx.fillText("4 Litre", 240, 905);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  }, [mode]);
}

// 3D Realistic Canister Model
function EngineOilCanister({
  mode = "studio",
  interactive = true,
}: {
  mode: "studio" | "shield" | "thermal";
  interactive?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const labelTexture = useBottleLabelTexture(mode);

  // Smooth floating and slight natural rotation
  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    if (!interactive) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.35 + (pointer.x * 0.4);
      groupRef.current.rotation.x = (pointer.y * 0.2);
    }

    if (liquidRef.current) {
      liquidRef.current.position.y = -0.1 + Math.sin(t * 1.5) * 0.04;
    }
  });

  // Dynamic colors and materials based on mode (Charcoal HDPE plastic matching real photo)
  const bottleColor = mode === "thermal" ? "#7f1d1d" : mode === "shield" ? "#1e293b" : "#202329";
  const bottleRoughness = mode === "thermal" ? 0.4 : 0.3;
  const bottleMetalness = mode === "shield" ? 0.8 : 0.35;

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* --- Main Jug Body (Rounded rectangular container) --- */}
      <RoundedBox
        args={[2.6, 3.4, 1.4]}
        radius={0.25}
        smoothness={6}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={bottleColor}
          roughness={bottleRoughness}
          metalness={bottleMetalness}
          envMapIntensity={1.8}
        />
      </RoundedBox>

      {/* --- Recessed Front Face for Label --- */}
      <RoundedBox
        args={[2.2, 2.7, 0.05]}
        radius={0.08}
        smoothness={4}
        position={[0, -0.1, 0.7]}
      >
        <meshStandardMaterial
          map={labelTexture || undefined}
          roughness={0.25}
          metalness={0.1}
        />
      </RoundedBox>

      {/* --- Back Label Face --- */}
      <RoundedBox
        args={[2.2, 2.7, 0.05]}
        radius={0.08}
        smoothness={4}
        position={[0, -0.1, -0.7]}
      >
        <meshStandardMaterial
          map={labelTexture || undefined}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>

      {/* --- Oil Level Sight Window (Translucent stripe on side) --- */}
      <mesh position={[1.31, -0.1, 0]}>
        <boxGeometry args={[0.02, 2.8, 0.3]} />
        <meshPhysicalMaterial
          color="#ffaa00"
          transmission={0.85}
          opacity={1}
          transparent
          roughness={0.1}
          ior={1.48}
        />
      </mesh>

      {/* Inside fluid level indicator visible through stripe */}
      <mesh ref={liquidRef} position={[1.25, -0.1, 0]}>
        <boxGeometry args={[0.06, 2.5, 0.22]} />
        <meshStandardMaterial
          color="#ff7700"
          emissive="#ff5500"
          emissiveIntensity={0.6}
          roughness={0.1}
        />
      </mesh>

      {/* --- Ergonomic Handle on Right Side (As seen in real product photo) --- */}
      {/* Handle horizontal bar */}
      <mesh position={[0.45, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 1.5, 24]} />
        <meshStandardMaterial
          color={bottleColor}
          roughness={bottleRoughness}
          metalness={bottleMetalness}
        />
      </mesh>
      {/* Handle vertical connectors */}
      <mesh position={[-0.25, 1.9, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.7, 24]} />
        <meshStandardMaterial
          color={bottleColor}
          roughness={bottleRoughness}
          metalness={bottleMetalness}
        />
      </mesh>
      <mesh position={[1.15, 1.9, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.7, 24]} />
        <meshStandardMaterial
          color={bottleColor}
          roughness={bottleRoughness}
          metalness={bottleMetalness}
        />
      </mesh>

      {/* --- Bottle Shoulder & Pour Spout Neck on Left Side --- */}
      <mesh position={[-0.75, 1.95, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.5, 0.55, 32]} />
        <meshStandardMaterial
          color={bottleColor}
          roughness={bottleRoughness}
          metalness={bottleMetalness}
        />
      </mesh>

      {/* Threaded Spout Neck */}
      <mesh position={[-0.75, 2.25, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.25, 32]} />
        <meshStandardMaterial color="#111317" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* --- Realistic Cap with Grip Ridges (Black Charcoal as in real photo) --- */}
      <group position={[-0.75, 2.45, 0]}>
        {/* Main Cap Cylinder */}
        <mesh castShadow>
          <cylinderGeometry args={[0.44, 0.44, 0.35, 32]} />
          <meshStandardMaterial
            color="#14171C"
            roughness={0.25}
            metalness={0.4}
          />
        </mesh>
        {/* Safety Seal Ring below cap */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.08, 32]} />
          <meshStandardMaterial color="#252932" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Top embossed ridges on cap */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.03, 32]} />
          <meshStandardMaterial color="#20242C" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* --- Surrounding Floating Amber Viscous Oil Droplets --- */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh position={[1.8, 1.2, 0.8]} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <MeshDistortMaterial
            color="#ff8800"
            emissive="#ff5500"
            emissiveIntensity={0.5}
            roughness={0.05}
            metalness={0.2}
            distort={0.4}
            speed={3}
          />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[-1.7, -0.8, 0.9]} castShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <MeshDistortMaterial
            color="#ffaa00"
            emissive="#ff6600"
            emissiveIntensity={0.4}
            roughness={0.05}
            distort={0.5}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh position={[1.5, -1.2, -0.8]}>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color="#ffbb00"
            emissive="#ff7700"
            emissiveIntensity={0.6}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* --- Glowing Orbital Fluid Ring --- */}
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]} position={[0, -0.2, 0]}>
        <torusGeometry args={[2.4, 0.035, 16, 120]} />
        <meshStandardMaterial
          color="#FF8800"
          emissive="#FF6B00"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {mode === "shield" && (
        <mesh rotation={[Math.PI / 3, -0.3, 0]} position={[0, -0.2, 0]}>
          <torusGeometry args={[2.8, 0.02, 16, 120]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.5}
            roughness={0.1}
          />
        </mesh>
      )}

      {/* Contact Shadow for grounded realism */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.65}
        scale={6}
        blur={1.5}
        far={4}
        color="#ff4400"
      />
    </group>
  );
}

// Full 3D Interactive Scene with Studio Lighting & Pedestal
export default function EngineOilBottle3D({
  mode = "studio",
  interactive = true,
  showControls = false,
  className = "w-full h-full",
}: {
  mode?: "studio" | "shield" | "thermal";
  interactive?: boolean;
  showControls?: boolean;
  className?: string;
}) {
  const [activeMode, setActiveMode] = useState<"studio" | "shield" | "thermal">(mode);

  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.5, 6.2], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        {/* --- High Contrast Studio Lighting --- */}
        {/* Ambient base fill */}
        <ambientLight intensity={1.2} />

        {/* Crisp Key Light (Top-Right) */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={2.8}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Warm Orange Rim/Accent Light (Back-Left) */}
        <spotLight
          position={[-6, 6, -3]}
          intensity={4.5}
          color="#FF7700"
          angle={0.6}
          penumbra={0.8}
        />

        {/* Secondary Front Fill Light */}
        <pointLight position={[0, -2, 4]} intensity={1.8} color="#FF9933" />

        {/* Mode specific light */}
        {activeMode === "thermal" && (
          <pointLight position={[0, 0, 2]} intensity={4} color="#FF2200" />
        )}
        {activeMode === "shield" && (
          <pointLight position={[0, 0, 2]} intensity={3} color="#38BDF8" />
        )}

        {/* --- 3D Model with optional Float --- */}
        <Float
          speed={interactive ? 1.5 : 2}
          rotationIntensity={interactive ? 0.2 : 0.4}
          floatIntensity={0.4}
        >
          <EngineOilCanister mode={activeMode} interactive={interactive} />
        </Float>

        {/* Orbit Controls if interactive is true */}
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.8}
          />
        )}
      </Canvas>

      {/* Interactive Mode Switcher Toolbar (if enabled) */}
      {showControls && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 backdrop-blur-md shadow-2xl">
          <button
            onClick={() => setActiveMode("studio")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeMode === "studio"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/40"
                : "text-slate-300 hover:text-white"
            }`}
          >
            3D Canister
          </button>
          <button
            onClick={() => setActiveMode("shield")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeMode === "shield"
                ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-black shadow-lg shadow-sky-500/40"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Wear Shield
          </button>
          <button
            onClick={() => setActiveMode("thermal")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeMode === "thermal"
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-500/40"
                : "text-slate-300 hover:text-white"
            }`}
          >
            300°C Heat
          </button>
        </div>
      )}

      {/* Interactive Helper Hint */}
      {interactive && (
        <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white/70 text-[11px] backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-orange-primary animate-ping" />
          <span>Drag to rotate 360°</span>
        </div>
      )}
    </div>
  );
}
