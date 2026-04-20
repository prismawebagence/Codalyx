"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Label texture generated on a canvas ── */
function createLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1280;
  const ctx = canvas.getContext("2d")!;
  const W = 1024;
  const H = 1280;

  // Cream background with subtle paper grain
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#f7f0d9");
  bg.addColorStop(0.5, "#efe6c8");
  bg.addColorStop(1, "#d8cba6");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Paper grain (subtle noise)
  const grain = ctx.createImageData(W, H);
  for (let i = 0; i < grain.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 18;
    grain.data[i] = grain.data[i + 1] = grain.data[i + 2] = 128 + n;
    grain.data[i + 3] = 16;
  }
  ctx.putImageData(grain, 0, 0);

  // Outer gold double border
  ctx.strokeStyle = "#b8953f";
  ctx.lineWidth = 5;
  ctx.strokeRect(30, 30, W - 60, H - 60);
  ctx.strokeStyle = "rgba(184,149,63,0.45)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(58, 58, W - 116, H - 116);

  // Thin gold separators
  const hLine = (y: number, x0: number, x1: number, opacity = 1) => {
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.strokeStyle = `rgba(184,149,63,${opacity})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  };

  hLine(280, 200, W - 200, 0.9);
  hLine(470, 240, W - 240, 0.55);
  hLine(900, 280, W - 280, 0.55);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // "LA CAVE DU"
  ctx.fillStyle = "#2a120f";
  ctx.font = "600 58px Georgia, serif";
  ctx.fillText("LA CAVE DU", W / 2, 200);

  // Main title "SOMMELIER"
  ctx.fillStyle = "#1a0807";
  ctx.font = "bold 108px Georgia, serif";
  ctx.fillText("SOMMELIER", W / 2, 400);

  // Region line
  ctx.fillStyle = "#6a4418";
  ctx.font = "italic 38px Georgia, serif";
  ctx.fillText("Alsace  \u2014  Grand Cru", W / 2, 548);

  // Small crest (circle + star)
  ctx.save();
  ctx.translate(W / 2, 680);
  ctx.strokeStyle = "#b8953f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 54, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#b8953f";
  ctx.font = "60px serif";
  ctx.fillText("\u2736", 0, 22);
  ctx.restore();

  // Vintage year
  ctx.fillStyle = "#1a0807";
  ctx.font = "italic 200px 'Didot', Georgia, serif";
  ctx.fillText("2020", W / 2, 870);

  // Grape varietal
  ctx.fillStyle = "#6a4418";
  ctx.font = "500 46px Georgia, serif";
  ctx.fillText("RIESLING", W / 2, 970);

  // Estate line
  ctx.fillStyle = "#2a120f";
  ctx.font = "italic 30px Georgia, serif";
  ctx.fillText("Mis en bouteille au domaine", W / 2, 1060);

  // Volume / alc
  ctx.fillStyle = "#6a4418";
  ctx.font = "500 26px Georgia, serif";
  ctx.fillText("75 cl   \u00b7   13,5% vol.", W / 2, 1120);

  // Bottom ornament
  ctx.fillStyle = "#b8953f";
  ctx.font = "36px serif";
  ctx.fillText("\u2767", W / 2, 1200);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ── Bottle profile (radius, height) — Alsace flute ── */
const PROFILE: [number, number][] = [
  [0.0,    0    ],
  [0.062,  0    ],
  [0.067,  0.018],
  [0.069,  0.07 ],
  [0.069,  0.24 ],
  [0.069,  0.52 ],
  [0.068,  0.56 ],
  [0.060,  0.62 ],
  [0.045,  0.68 ],
  [0.032,  0.73 ],
  [0.024,  0.78 ],
  [0.022,  0.86 ],
  [0.022,  0.92 ],
  [0.025,  0.935],
  [0.025,  0.965],
  [0.022,  0.985],
  [0.018,  1.0  ],
];

/* ── 3D Scene ── */
function BottleScene() {
  const groupRef = useRef<THREE.Group>(null);

  const labelTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createLabelTexture();
  }, []);

  const outerPoints = useMemo(
    () => PROFILE.map(([x, y]) => new THREE.Vector2(x, y)),
    []
  );

  // Punt (concave bottom) — small indentation
  const puntPoints = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const r = 0.055 * (1 - t);
      const y = 0.018 + Math.sin(t * Math.PI * 0.5) * 0.028;
      pts.push(new THREE.Vector2(r, y));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.32) * 0.22;
  });

  return (
    <Float speed={1.2} floatIntensity={0.16} rotationIntensity={0}>
      <group ref={groupRef} position={[0, -0.5, 0]}>

        {/* ── Glass body with real transmission ── */}
        <mesh castShadow receiveShadow renderOrder={1}>
          <latheGeometry args={[outerPoints, 128]} />
          <MeshTransmissionMaterial
            color="#1f5a2a"
            transmission={1}
            thickness={0.35}
            roughness={0.06}
            ior={1.48}
            chromaticAberration={0.04}
            anisotropy={0.25}
            distortion={0.05}
            distortionScale={0.3}
            temporalDistortion={0.1}
            attenuationColor="#0a1f10"
            attenuationDistance={0.5}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Punt (bottom concavity) */}
        <mesh position={[0, 0, 0]}>
          <latheGeometry args={[puntPoints, 64]} />
          <meshStandardMaterial color="#0a1f10" roughness={0.4} />
        </mesh>

        {/* ── Gold foil capsule (neck) ── */}
        <mesh position={[0, 0.895, 0]} castShadow>
          <cylinderGeometry args={[0.0262, 0.0252, 0.072, 48]} />
          <meshPhysicalMaterial
            color="#c9a84c"
            metalness={0.92}
            roughness={0.18}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* Capsule seam ridge */}
        <mesh position={[0, 0.932, 0]}>
          <torusGeometry args={[0.0262, 0.0018, 8, 48]} />
          <meshPhysicalMaterial color="#a8872f" metalness={0.95} roughness={0.25} />
        </mesh>

        {/* Capsule top disc (slightly recessed rim) */}
        <mesh position={[0, 0.9315, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.0262, 48]} />
          <meshPhysicalMaterial color="#b8953f" metalness={0.9} roughness={0.28} />
        </mesh>

        {/* ── Cylindrical label wrapping the bottle ── */}
        {labelTexture && (
          <mesh position={[0, 0.35, 0]}>
            {/* openEnded cylinder, thetaLength ~140° so label wraps front */}
            <cylinderGeometry
              args={[0.0705, 0.0705, 0.225, 64, 1, true, -Math.PI * 0.39, Math.PI * 0.78]}
            />
            <meshPhysicalMaterial
              map={labelTexture}
              roughness={0.72}
              metalness={0.0}
              clearcoat={0.15}
              clearcoatRoughness={0.45}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Small back-label strip */}
        {labelTexture && (
          <mesh position={[0, 0.22, 0]} rotation={[0, Math.PI, 0]}>
            <cylinderGeometry
              args={[0.0705, 0.0705, 0.07, 64, 1, true, -Math.PI * 0.22, Math.PI * 0.44]}
            />
            <meshPhysicalMaterial
              color="#f0e6c8"
              roughness={0.75}
              metalness={0}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

/* ── Exported component ── */
export default function WineBottle3D() {
  return (
    <div className="relative">
      {/* Warm bottom glow */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.32), rgba(114,47,55,0.14) 55%, transparent 80%)",
        }}
      />

      <div className="w-[170px] h-[460px] sm:w-[210px] sm:h-[550px] lg:w-[255px] lg:h-[650px]">
        <Canvas
          camera={{ position: [0, -0.04, 2.5], fov: 30 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          shadows
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            {/* Three-point lighting */}
            <ambientLight intensity={0.35} />
            {/* Key */}
            <spotLight
              position={[-2.2, 3.2, 2.8]}
              intensity={6}
              angle={0.32}
              penumbra={0.8}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            {/* Warm rim light (gold) */}
            <pointLight position={[2.4, 1.2, 0.8]} intensity={2.2} color="#e8c57a" />
            {/* Cool fill from behind for glass edge */}
            <pointLight position={[-1.2, -0.6, -1.8]} intensity={1.4} color="#7ab69a" />
            {/* Front soft fill */}
            <pointLight position={[0, 0.2, 2.2]} intensity={0.6} color="#ffffff" />

            {/* Environment for glass reflections */}
            <Environment preset="studio" />

            <BottleScene />

            {/* Contact shadow under bottle */}
            <ContactShadows
              position={[0, -0.52, 0]}
              opacity={0.55}
              scale={1.2}
              blur={2.6}
              far={0.8}
              resolution={512}
              color="#1a0a0a"
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
