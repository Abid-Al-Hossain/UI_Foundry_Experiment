"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTransition } from "./TransitionProvider";
import { ANIMATIONS } from "./animations";
import ThreeDWrapper from "./ThreeDWrapper";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { animation, speed, direction } = useTransition();
  const variants = ANIMATIONS[animation];
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
    <div className="grid h-full w-full overflow-hidden" style={{ gridTemplateRows: "minmax(0, 1fr)", gridTemplateColumns: "minmax(0, 1fr)" }}>
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={reduceMotion ? undefined : variants}
          initial={reduceMotion ? false : "initial"}
          animate={reduceMotion ? undefined : "enter"}
          exit={reduceMotion ? undefined : "exit"}
          transition={{ ease: "easeInOut", duration }}
          className="grid h-full w-full overflow-hidden bg-[var(--surface)]"
          style={{ width: "100%", height: "100%", gridArea: "1 / 1", gridTemplateRows: "minmax(0, 1fr)", gridTemplateColumns: "minmax(0, 1fr)" }}
        >
          <ThreeDWrapper>{children}</ThreeDWrapper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
