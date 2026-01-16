"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  Sphere,
  Box,
  Torus,
  Html,
  MeshDistortMaterial,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  type ThreeDBadgeMode,
  type ThreeDStatusMode,
} from "./ThreeAvatarSection";
import { type MotionEntrance, type MotionHover } from "./MotionSection";

// Prop types based on AvatarState, simplified for preview
export type AvatarPreviewProps = {
  src: string;
  alt: string;
  initials: string;
  size: string;
  radiusMode: string;
  radiusValue: number;
  borderWidth: number;
  borderColor: string;
  borderStyle: string;
  objectFit: React.CSSProperties["objectFit"];
  filters: string;

  // Advanced State
  use3DBadge: ThreeDBadgeMode;
  badgeAnimate: boolean;
  use3DStatus: ThreeDStatusMode;

  entranceAnimation: MotionEntrance;
  hoverEffect: MotionHover;
  textureEffect: string;
  borderEffect: string;
  accessoryType: string;
  accessoryColor: string;
  orbitSpeed: string;

  // We can pass prepared styles object for standard things
  containerStyle: React.CSSProperties;
  imageStyle: React.CSSProperties;
};

export default function AvatarLivePreview(props: AvatarPreviewProps) {
  const {
    src,
    alt,
    initials,
    use3DBadge,
    badgeAnimate,
    use3DStatus,
    entranceAnimation,
    hoverEffect,
    textureEffect,
    borderEffect,
    accessoryType,
    accessoryColor,
    orbitSpeed,
    containerStyle,
    imageStyle,
  } = props;

  // Motion Variants
  const variants = {
    hidden: {
      opacity: entranceAnimation === "fade" ? 0 : 1,
      scale: entranceAnimation === "scale" ? 0 : 1,
      x: entranceAnimation === "slide" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
    hover: {
      scale: hoverEffect === "scale" ? 1.1 : 1,
    },
  };

  const Wrapper = motion.div;

  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent">
      <Wrapper
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={variants}
        style={{ position: "relative", ...containerStyle }}
        layoutId={hoverEffect === "layout" ? "avatar-preview" : undefined}
      >
        {/* Image / Initials */}
        {src ? (
          <img src={src} alt={alt} style={imageStyle} />
        ) : (
          <div
            style={imageStyle}
            className="flex items-center justify-center text-xl font-bold text-gray-400"
          >
            {initials}
          </div>
        )}

        {/* 3D Overlay */}
        {(use3DBadge !== "none" || use3DStatus !== "none") && (
          <div
            style={{ position: "absolute", inset: -20, pointerEvents: "none" }}
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} />

              {/* 3D Badge (Top Right) */}
              {use3DBadge !== "none" && (
                <BadgeMesh type={use3DBadge} animate={badgeAnimate} />
              )}

              {/* 3D Status Ring */}
              {use3DStatus !== "none" && <StatusMesh type={use3DStatus} />}

              {/* 3D Accessories */}
              {accessoryType !== "none" && (
                <AccessoryMesh
                  type={accessoryType}
                  color={accessoryColor}
                  speed={Number(orbitSpeed)}
                />
              )}
            </Canvas>
          </div>
        )}

        {/* Motion Textures (Overlays) */}
        {textureEffect === "glitch" && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
            animate={{ x: [-2, 2, -2], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 0.2 }}
            style={{
              background:
                "linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)",
              backgroundSize: "100% 4px",
            }}
          />
        )}
        {textureEffect === "fluid" && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none mix-blend-color-dodge"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        )}

        {/* Border Effects */}
        {borderEffect === "snake" && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: "visible" }}
          >
            <motion.rect
              width="100%"
              height="100%"
              fill="none"
              stroke={props.borderColor}
              strokeWidth={props.borderWidth || 2}
              rx={typeof props.radiusValue === "number" ? props.radiusValue : 0}
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: 0.4, pathOffset: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        )}
        {borderEffect === "heartbeat" && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: containerStyle.borderRadius,
              border: `${props.borderWidth || 2}px solid ${props.borderColor}`,
            }}
            animate={{
              scale: [1, 1.05, 1],
              borderColor: [props.borderColor, "#ef4444", props.borderColor],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </Wrapper>
    </div>
  );
}

function BadgeMesh({
  type,
  animate,
}: {
  type: ThreeDBadgeMode;
  animate: boolean;
}) {
  // Position top-right relative to center (approx)
  const position: [number, number, number] = [1.2, 1.2, 0];

  return (
    <Float
      speed={animate ? 4 : 2}
      rotationIntensity={animate ? 2 : 0.5}
      floatIntensity={1}
    >
      <mesh position={position}>
        {type === "sphere" && <sphereGeometry args={[0.4, 32, 32]} />}
        {type === "cube" && <boxGeometry args={[0.6, 0.6, 0.6]} />}
        {type === "star" && <octahedronGeometry args={[0.5]} />}
        <meshStandardMaterial color="#ef4444" roughness={0.3} />
      </mesh>
    </Float>
  );
}

function StatusMesh({ type }: { type: ThreeDStatusMode }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {type === "ring" && (
        <mesh>
          <torusGeometry args={[1.6, 0.1, 16, 100]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      )}
      {type === "halo" && (
        <mesh>
          <torusGeometry args={[1.8, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={1}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  );
}

function AccessoryMesh({
  type,
  color,
  speed,
}: {
  type: string;
  color: string;
  speed: number;
}) {
  if (type === "crown") {
    return (
      <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[0, 1.4, 0]} rotation={[0.2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 0.2, 5]} />
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.5}
            />
          </mesh>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh
              key={i}
              position={[
                Math.sin(i * Math.PI * 0.4) * 0.5,
                0.2,
                Math.cos(i * Math.PI * 0.4) * 0.5,
              ]}
            >
              <coneGeometry args={[0.1, 0.3, 4]} />
              <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>
      </Float>
    );
  }
  if (type === "halo-cyber") {
    return (
      <Float speed={speed * 2} rotationIntensity={0} floatIntensity={0.2}>
        <group rotation={[Math.PI / 3, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.6, 0.02, 16, 100]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[1.8, 0.01, 16, 100]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1}
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      </Float>
    );
  }
  if (type === "orb-float") {
    return (
      <group>
        <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[1.5, 0.5, 0.5]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <MeshDistortMaterial
              color={color}
              speed={2}
              distort={0.6}
              radius={1}
            />
          </mesh>
        </Float>
        <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[-1.5, -0.5, 0.5]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
            />
          </mesh>
        </Float>
      </group>
    );
  }
  return null;
}
