/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";
import * as THREE from "three";

const TEXTURE_URL =
  "https://images.unsplash.com/photo-1732869415090-179de017b6d6?crop=entropy&cs=srgb&fm=jpg&q=85&w=800";

/**
 * A single draping curtain panel built from a segmented plane.
 * Vertices are displaced into vertical pleats + a gentle time-based sway.
 * The panel slides toward the edge as `openRef.current` grows (0 closed -> 1 open).
 */
function CurtainPanel({ side = "left", openRef }) {
  const meshRef = useRef();
  const geoRef = useRef();
  const basePos = useRef(null);
  const currentOpen = useRef(0);

  const dir = side === "left" ? -1 : 1;
  const W = 2.4;
  const H = 6;

  const texture = useTexture(TEXTURE_URL);
  useMemo(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 4;
  }, [texture]);

  useFrame((state) => {
    const geo = geoRef.current;
    const mesh = meshRef.current;
    if (!geo || !mesh) return;

    const pos = geo.attributes.position;
    if (!basePos.current) {
      basePos.current = Float32Array.from(pos.array);
    }
    const base = basePos.current;
    const t = state.clock.elapsedTime;

    // ease current open toward target
    const target = openRef.current;
    currentOpen.current += (target - currentOpen.current) * 0.06;
    const open = currentOpen.current;

    const foldFreq = 7.0;
    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const x = base[ix];
      const y = base[ix + 1];
      // normalized across width for gather effect (edge near center gathers when open)
      const nx = (x / W) + 0.5; // 0..1
      const pleatAmp = 0.16 + open * 0.22;
      const fold = Math.sin(nx * Math.PI * foldFreq) * pleatAmp;
      const sway = Math.sin(t * 0.9 + y * 0.6 + nx * 3) * 0.05 * (1 - open * 0.5);
      pos.array[ix + 2] = fold + sway;
      // horizontal gather: compress width toward the outer edge as it opens
      pos.array[ix] = x * (1 - open * 0.45);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    // slide panel toward its side
    mesh.position.x = dir * (W / 2) + dir * open * (W * 0.62);
  });

  return (
    <mesh ref={meshRef} position={[dir * (W / 2), 0, 0]}>
      <planeGeometry ref={geoRef} args={[W, H, 32, 40]} />
      <meshStandardMaterial
        map={texture}
        color={"#E8DCC4"}
        roughness={0.85}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CurtainRod() {
  return (
    <mesh position={[0, 3.05, 0.15]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.05, 0.05, 5.4, 24]} />
      <meshStandardMaterial color={"#C5A059"} roughness={0.3} metalness={0.8} />
    </mesh>
  );
}

// Warm window glow behind the curtains
function WindowGlow() {
  return (
    <mesh position={[0, 0, -1.2]}>
      <planeGeometry args={[6, 7]} />
      <meshBasicMaterial color={"#FBF3E2"} />
    </mesh>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.4 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.25 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CurtainScene({ openRef }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      data-testid="curtain-canvas"
    >
      <color attach="background" args={["#1A1712"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 4, 5]} intensity={1.4} color={"#fff4dd"} />
      <pointLight position={[0, 0, -2]} intensity={2.2} color={"#ffe9c2"} distance={12} />
      <Suspense fallback={null}>
        <WindowGlow />
        <CurtainRod />
        <CurtainPanel side="left" openRef={openRef} />
        <CurtainPanel side="right" openRef={openRef} />
        <Environment preset="apartment" />
      </Suspense>
      <Rig />
    </Canvas>
  );
}
