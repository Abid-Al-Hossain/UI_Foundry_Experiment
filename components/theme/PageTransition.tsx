"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useTransition } from "./TransitionProvider";
import { ANIMATIONS } from "./animations";
import ThreeDWrapper from "./ThreeDWrapper";

// AnimatePresence retains an exiting face, but App Router would otherwise
// update that face's slot to the destination route before its exit completes.
function FrozenRoute({ children }: { children: React.ReactNode }) {
  const routerContext = useContext(LayoutRouterContext);
  const [frozenContext] = useState(routerContext);

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { animation, speed, direction } = useTransition();
  const variants = ANIMATIONS[animation];
  const isCube = animation === "cube";
  const usesPerspective = isCube || animation === "flip" || animation === "fold" || animation === "room";
  const duration = reduceMotion
    ? 0
    : speed === "slow"
      ? 0.8
      : speed === "fast"
        ? 0.2
        : speed === "sonic"
          ? 0.1
          : 0.4;

  return (
    <div
      className="grid h-full w-full overflow-hidden"
      data-motion={animation}
      style={{
        gridTemplateRows: "minmax(0, 1fr)",
        gridTemplateColumns: "minmax(0, 1fr)",
        perspective: usesPerspective ? "1200px" : undefined,
        perspectiveOrigin: "50% 50%",
      }}
    >
      <AnimatePresence mode={isCube ? "sync" : "wait"} initial={false} custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={reduceMotion ? undefined : variants}
          initial={reduceMotion ? false : "initial"}
          animate={reduceMotion ? undefined : "enter"}
          exit={reduceMotion ? undefined : "exit"}
          transition={{ ease: isCube ? [0.65, 0, 0.35, 1] : "easeInOut", duration }}
          className="grid h-full w-full overflow-hidden bg-[var(--surface)]"
          style={{
            width: "100%",
            height: "100%",
            gridArea: "1 / 1",
            gridTemplateRows: "minmax(0, 1fr)",
            gridTemplateColumns: "minmax(0, 1fr)",
            willChange: reduceMotion ? undefined : "transform, filter, opacity",
          }}
        >
          <FrozenRoute>
            <ThreeDWrapper>{children}</ThreeDWrapper>
          </FrozenRoute>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
