"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTransition } from "./TransitionProvider";

export default function ThreeDWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode3d, settings3d } = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Calculate rotation based on settings
  const rotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    [settings3d.tiltMax, -settings3d.tiltMax],
  );
  const rotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-settings3d.tiltMax, settings3d.tiltMax],
  );

  useEffect(() => {
    // If standard mode, reset
    if (mode3d === "standard") {
      x.set(0);
      y.set(0);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-0.5 to 0.5)
      const normalizedX = e.clientX / window.innerWidth - 0.5;
      const normalizedY = e.clientY / window.innerHeight - 0.5;

      x.set(normalizedX);
      y.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mode3d, x, y]);

  // If standard, just render children without extra wrappers if possible,
  // or render with no transform.
  if (mode3d === "standard") {
    return <div className="h-full w-full">{children}</div>;
  }

  // Scroll-safe tilt: apply a self-contained flat perspective transform
  // (transformPerspective on the element itself) instead of establishing a
  // shared preserve-3d 3D context. A flat transformed ancestor does NOT break
  // descendant overflow scrolling, whereas transform-style: preserve-3d does.
  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformPerspective: settings3d.perspective || 1200,
        width: "100%",
        height: "100%",
      }}
      className="origin-center h-full w-full"
    >
      {children}
    </motion.div>
  );
}
