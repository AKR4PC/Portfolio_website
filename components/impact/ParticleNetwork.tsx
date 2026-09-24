"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useIsDesktop, useReducedMotion } from "@/lib/hooks";
import { gsap } from "@/lib/motion";

type NetworkLabel = {
  text: string;
  x: string;
  y: string;
  rx: number;
  ry: number;
  phase: number;
};

const labels: NetworkLabel[] = [
  { text: "COMMUNITY", x: "13%", y: "27%", rx: 37, ry: 35, phase: 0 },
  { text: "AI", x: "68%", y: "19%", rx: 28, ry: 26, phase: Math.PI / 4 },
  { text: "OPEN SOURCE", x: "76%", y: "69%", rx: 18, ry: 17, phase: Math.PI / 2 },
  { text: "EVENTS", x: "31%", y: "77%", rx: 37, ry: 35, phase: (Math.PI * 3) / 4 },
  { text: "PRODUCT", x: "48%", y: "42%", rx: 28, ry: 26, phase: Math.PI },
  { text: "ENGINEERING", x: "16%", y: "60%", rx: 18, ry: 17, phase: (Math.PI * 5) / 4 },
  { text: "DEVREL", x: "82%", y: "40%", rx: 37, ry: 35, phase: (Math.PI * 3) / 2 },
  { text: "CONTENT", x: "41%", y: "15%", rx: 28, ry: 26, phase: (Math.PI * 7) / 4 },
];

function NetworkPoints({ active }: { active: boolean }) {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  const { pointGeometry, lineGeometry } = useMemo(() => {
    const count = 300;
    const pointPositions = new Float32Array(count * 3);
    const seeded = (index: number) => {
      const value = Math.sin(index * 91.17) * 43758.5453;
      return value - Math.floor(value);
    };
    for (let i = 0; i < count; i += 1) {
      const theta = seeded(i) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(i + count) - 1);
      const radius = 1.55 + seeded(i + count * 2) * 0.2;
      pointPositions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      pointPositions[i * 3 + 1] = Math.cos(phi) * radius * 0.62;
      pointPositions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    }
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));

    const linePositions: number[] = [];
    for (let i = 0; i < count; i += 1) {
      for (let j = i + 1; j < count; j += 1) {
        const dx = pointPositions[i * 3] - pointPositions[j * 3];
        const dy = pointPositions[i * 3 + 1] - pointPositions[j * 3 + 1];
        const dz = pointPositions[i * 3 + 2] - pointPositions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < 0.46 && (i + j) % 2 === 0) {
          linePositions.push(
            pointPositions[i * 3], pointPositions[i * 3 + 1], pointPositions[i * 3 + 2],
            pointPositions[j * 3], pointPositions[j * 3 + 1], pointPositions[j * 3 + 2],
          );
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    return { pointGeometry, lineGeometry };
  }, []);

  useEffect(() => {
    return () => {
      pointGeometry.dispose();
      lineGeometry.dispose();
    };
  }, [lineGeometry, pointGeometry]);

  useFrame((state, delta) => {
    if (!active) return;
    if (group.current) {
      group.current.rotation.y += delta * 0.065;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    }
    if (points.current) {
      points.current.rotation.y -= delta * 0.018;
    }
  });

  return (
    <group ref={group} rotation={[0.12, -0.35, 0.08]}>
      <points ref={points} geometry={pointGeometry}>
        <pointsMaterial color="#f7f7f5" size={0.022} sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#888" transparent opacity={0.32} />
      </lineSegments>
    </group>
  );
}

export default function ParticleNetwork() {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const labelLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setWebglAvailable(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const layer = labelLayer.current;
    if (!layer || reduced || !visible) return;

    const context = gsap.context(() => {
      const elements = Array.from(layer.querySelectorAll<HTMLElement>("span"));
      const orbit = { angle: 0 };
      const placeLabels = () => {
        elements.forEach((element, index) => {
          const config = labels[index];
          if (!config) return;
          // One shared clockwise orbit keeps every word in motion and distributes the labels across three rings.
          const angle = orbit.angle + config.phase;
          const x = 50 + Math.cos(angle) * config.rx;
          const y = 50 + Math.sin(angle) * config.ry;
          const depth = (Math.sin(angle) + 1) / 2;
          const tilt = Math.sin(angle * 2) * 3;
          element.style.left = `${x}%`;
          element.style.top = `${y}%`;
          element.style.opacity = `${0.55 + depth * 0.45}`;
          element.style.zIndex = `${Math.round(depth * 10)}`;
          element.style.transform = `translate(-50%, -50%) rotate(${tilt}deg) scale(${0.86 + depth * 0.22})`;
        });
      };

      placeLabels();
      gsap.to(orbit, {
        angle: Math.PI * 2,
        duration: 32,
        repeat: -1,
        ease: "none",
        onUpdate: placeLabels,
      });
    }, layer);

    return () => context.revert();
  }, [reduced, visible]);

  return (
    <div ref={container} className={`network-visual ${visible ? "is-visible" : ""}`}>
      <div className="network-orbit orbit-a" />
      <div className="network-orbit orbit-b" />
      {desktop && !reduced && webglAvailable ? (
        <div className="network-canvas" aria-label="Rotating network of developer ecosystem nodes" role="img">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]} frameloop={visible ? "always" : "never"} gl={{ alpha: true, antialias: true }}>
            <NetworkPoints active={visible} />
            <AdaptiveDpr pixelated />
          </Canvas>
        </div>
      ) : (
        <div className="network-fallback" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      )}
      <div ref={labelLayer} className="network-labels" aria-hidden="true">
        {labels.map((label) => <span key={label.text} style={{ left: label.x, top: label.y }}>{label.text}</span>)}
      </div>
      <div className="network-caption">A living map of the work<br />between code and people.</div>
    </div>
  );
}
