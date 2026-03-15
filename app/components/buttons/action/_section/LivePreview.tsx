"use client";

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  MeshWobbleMaterial,
  Sparkles,
  Text,
  Center,
} from "@react-three/drei";
import * as THREE from "three";
import CanvasConfetti from "canvas-confetti";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useMemo } from "react";

import {
  type ThreeDIconMode,
  type ThreeDAnimation,
  type ClickEffect,
} from "./ThreeJSSection";

// Helper to confirm we are in a React Environment checks
export default function LivePreview(props: {
  // We will pass the specific styles and config needed for the button
  // For simplicity, we might pass the 'computed styles' or just the raw state
  // adapting what ActionPage has.

  // Minimal props for 3D Demo
  // Minimal props for 3D Demo
  use3DIcon: string;
  icon3DGeometry: string;
  icon3DMaterial: string;
  icon3DAnimation: string;
  iconRoughness: string;
  iconMetalness: string;
  iconTransmission: string;
  iconEmissive: string;
  icon3DColorInput: string;
  icon3DText: string;

  iconDistortion: string;
  iconThickness: string;
  iconChromaticAberration: string;

  clickEffect: string;
  clickParticleCount: string;
  hoverEffect: string;
  hoverSpringStiffness: string;
  hoverSpringDamping: string;

  // Style Props

  buttonStyle: React.CSSProperties;
  label: string;
  iconColor: string;
  isDisabled: boolean;
  activeEnabled: boolean;
  forceActive: boolean;
  activeScale: string;
  activeTranslateY: string;
}) {
  const {
    use3DIcon,
    icon3DGeometry,
    icon3DMaterial,
    icon3DAnimation,
    iconRoughness,
    iconMetalness,
    iconTransmission,

    iconEmissive,
    icon3DColorInput,
    icon3DText,
    iconDistortion,
    iconThickness,
    iconChromaticAberration,
    clickEffect,
    clickParticleCount,
    hoverEffect,
    hoverSpringStiffness,
    hoverSpringDamping,
    buttonStyle,
    label,
    iconColor,
    isDisabled,
    activeEnabled,
    forceActive,
    activeScale,
    activeTranslateY,
  } = props;

  // Motion State
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics params
  const springConfig = {
    stiffness: Number(hoverSpringStiffness) || 300,
    damping: Number(hoverSpringDamping) || 20,
  };

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Spotlight Gradient
  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const spotlightX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDisabled) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize -0.5 to 0.5
    const normX = (e.clientX - centerX) / rect.width;
    const normY = (e.clientY - centerY) / rect.height;

    x.set(normX);
    y.set(normY);
  };

  const handleMouseLeave = () => {
    if (isDisabled) return;
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) return;
    if (clickEffect === "confetti" || clickEffect === "explosion") {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      const count = Number(clickParticleCount) || 50;

      CanvasConfetti({
        particleCount: count,
        spread: clickEffect === "explosion" ? 160 : 70,
        startVelocity: clickEffect === "explosion" ? 60 : 30,
        origin: { x, y },
        gravity: clickEffect === "explosion" ? 1.2 : 0.6,
        scalar: clickEffect === "explosion" ? 1.2 : 1,
        drift: clickEffect === "explosion" ? 0.5 : 0,
        ticks: clickEffect === "explosion" ? 300 : 200,
        colors:
          clickEffect === "explosion"
            ? ["#FF0000", "#FFD700", "#FF4500", "#FFFFFF"]
            : undefined,
      });
    }
  };

  // Construct Motion Style
  // 1. Unconditionally call all hooks
  const magneticX = useTransform(springX, (v) => v * 30);
  const magneticY = useTransform(springY, (v) => v * 30);

  // 2. Derive conditional values based on props
  const xValue = hoverEffect === "magnetic" ? magneticX : 0;
  const yValue = hoverEffect === "magnetic" ? magneticY : 0;
  const rotateXValue = hoverEffect === "tilt" ? rotateX : 0;
  const rotateYValue = hoverEffect === "tilt" ? rotateY : 0;

  const motionStyle = {
    ...buttonStyle,
    x: xValue,
    y: yValue,
    scale: activeEnabled && forceActive ? Number(activeScale) || 1 : 1,
    translateY:
      activeEnabled && forceActive ? Number(activeTranslateY) || 0 : 0,
    rotateX: rotateXValue,
    rotateY: rotateYValue,
  };

  const spotlightGradient = useTransform(
    [springX, springY],
    ([latestX, latestY]: any[]) => {
      // Map -0.5..0.5 to 0%..100%
      const sx = (latestX + 0.5) * 100;
      const sy = (latestY + 0.5) * 100;
      return `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
    },
  );

  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent">
      <motion.button
        ref={ref}
        style={motionStyle as any}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-center justify-center gap-2 relative overflow-hidden"
      >
        {/* Spotlight Effect */}
        {hoverEffect === "spotlight" && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay"
            style={{
              background: spotlightGradient,
            }}
          />
        )}
        {/* 3D Icon / Sparkles Container */}
        {(use3DIcon !== "none" || hoverEffect === "sparkles") && (
          <div
            style={{
              width: use3DIcon !== "none" ? 24 : "100%",
              height: use3DIcon !== "none" ? 24 : "100%",
              position: use3DIcon !== "none" ? "relative" : "absolute",
              inset: use3DIcon !== "none" ? undefined : 0,
              pointerEvents: "none",
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 35 }}
              gl={{ alpha: true, antialias: true }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <spotLight
                position={[-10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
              />
              {/* 3D Icon Engine Disabled */}
              {hoverEffect === "sparkles" && (
                <Sparkles
                  count={50}
                  scale={use3DIcon !== "none" ? 3 : 6}
                  size={use3DIcon !== "none" ? 2 : 4}
                  speed={0.4}
                  opacity={0.7}
                  color="#FFD700"
                />
              )}
            </Canvas>
          </div>
        )}

        <span className="relative z-10">{label}</span>
      </motion.button>
    </div>
  );
}

function IconMesh({
  geometry,
  material,
  animation,
  color,
  roughness,
  metalness,
  transmission,
  emissive,
  distortion,
  thickness,
  chromaticAberration,
  text,
}: {
  geometry: string;
  material: string;
  animation: string;
  color: string;
  roughness: number;
  metalness: number;
  transmission: number;
  emissive: number;
  distortion: number;
  thickness: number;
  chromaticAberration: number;
  text: string;
}) {
  // Determine Geometry scale factor (visual balance)
  const scale = 2.4;

  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 5;
    const outerRadius = 1;
    const innerRadius = 0.5;
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0,
      y = 0;
    shape.moveTo(x + 5, y + 5);
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
    return shape;
  }, []);

  // Pulse Animation for Neon
  const [pulse, setPulse] = useState(1);
  useFrame((state) => {
    if (material === "neon") {
      const t = state.clock.getElapsedTime();
      // rhythmic pulse
      setPulse(1 + Math.sin(t * 3) * 0.3);
    }
  });

  const MaterialComponent = () => {
    switch (material) {
      case "glass":
        return (
          <MeshTransmissionMaterial
            samples={6}
            thickness={thickness || 0.5}
            chromaticAberration={0.05}
            anisotropy={0.1}
            roughness={roughness}
            transmission={transmission || 0.9}
            color={color}
          />
        );
      case "glass-crystal":
        return (
          <MeshTransmissionMaterial
            samples={8}
            thickness={thickness || 2}
            chromaticAberration={chromaticAberration || 0.5}
            anisotropy={0.5}
            roughness={0}
            transmission={1}
            color={color}
            toneMapped={false}
          />
        );
      case "liquid":
        return (
          <MeshTransmissionMaterial
            samples={6}
            thickness={thickness || 1.5}
            chromaticAberration={chromaticAberration || 0.2}
            anisotropy={0.2}
            roughness={0.1}
            transmission={1}
            color={color}
            distortion={distortion || 0.5}
            distortionScale={0.5}
            temporalDistortion={0.2}
          />
        );
      case "holographic":
        return (
          <MeshDistortMaterial
            color={color}
            speed={3}
            distort={0.4}
            radius={1}
            emissive={color}
            emissiveIntensity={emissive}
            roughness={roughness}
            metalness={metalness}
          />
        );
      case "neon":
        return (
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={emissive * pulse}
            roughness={roughness}
            metalness={metalness}
          />
        );
      case "plastic":
        return (
          <meshPhysicalMaterial
            color={color}
            clearcoat={1}
            clearcoatRoughness={0.1}
            roughness={roughness}
            metalness={0}
          />
        );
      default: // metal/standard
        return (
          <meshStandardMaterial
            color={color}
            roughness={roughness}
            metalness={metalness}
          />
        );
    }
  };

  return (
    <Float
      speed={animation === "float" ? 5 : 2}
      rotationIntensity={animation === "spin" ? 2 : 1}
      floatIntensity={animation === "wobble" ? 5 : 2}
    >
      <mesh rotation-y={animation === "spin" ? 1 : 0}>
        {geometry === "cube" && <boxGeometry args={[scale, scale, scale]} />}
        {geometry === "sphere" && (
          <sphereGeometry args={[scale * 0.7, 32, 32]} />
        )}
        {geometry === "tetra" && <tetrahedronGeometry args={[scale]} />}
        {geometry === "icosa" && (
          <icosahedronGeometry args={[scale * 0.8, 0]} />
        )}
        {geometry === "star" && (
          <extrudeGeometry
            args={[
              starShape,
              { depth: 0.4, bevelEnabled: true, bevelThickness: 0.1 },
            ]}
          />
        )}
        {geometry === "heart" && (
          <mesh
            scale={0.1}
            rotation={[Math.PI, 0, 0]}
            position={[0.5, 1, 0]}
          >
            <extrudeGeometry
              args={[
                heartShape,
                { depth: 2, bevelEnabled: true, bevelThickness: 1 },
              ]}
            />
            <MaterialComponent />
          </mesh>
        )}
        {geometry === "diamond" && (
          <octahedronGeometry args={[scale * 0.8]} />
        )}
        {geometry === "ring" && (
          <torusGeometry args={[scale * 0.6, scale * 0.2, 16, 32]} />
        )}
        {geometry === "knot" && (
          <torusKnotGeometry args={[scale * 0.5, scale * 0.2, 128, 32]} />
        )}
        {geometry === "text" && (
          <Center>
            <Text
              fontSize={scale * 0.8}
              color={color}
              anchorX="center"
              anchorY="middle"
              maxWidth={scale * 2}
            >
              {text || "⭐"}
            </Text>
          </Center>
        )}

        {geometry !== "heart" && <MaterialComponent />}
      </mesh>
    </Float>
  );
}
