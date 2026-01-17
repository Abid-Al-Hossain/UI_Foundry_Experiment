import { Variants } from "framer-motion";
import { Direction, AnimationType } from "./types";

// Helper to get variants based on direction
const slideVariants = (direction: Direction) => {
  let initialX = "0%",
    initialY = "0%";
  let exitX = "0%",
    exitY = "0%";

  if (direction === "left") {
    initialX = "100%";
    exitX = "-30%";
  } // Inner
  else if (direction === "right") {
    initialX = "-100%";
    exitX = "30%";
  } // Outer
  else if (direction === "down") {
    initialY = "-100%";
    exitY = "30%";
  } // Down Sibling (Enter from Top)
  else if (direction === "up") {
    initialY = "100%";
    exitY = "-30%";
  } // Up Sibling (Enter from Bottom)
  else {
    initialX = "100%";
    exitX = "-30%";
  }

  return {
    initial: { x: initialX, y: initialY, opacity: 1, zIndex: 1 },
    enter: { x: "0%", y: "0%", opacity: 1, zIndex: 1 },
    exit: { x: exitX, y: exitY, opacity: 0.5, zIndex: 0 },
  };
};

const pushVariants = (direction: Direction) => {
  let initialX = "0%",
    initialY = "0%";
  let exitX = "0%",
    exitY = "0%";

  if (direction === "left") {
    initialX = "100%";
    exitX = "-100%";
  } else if (direction === "right") {
    initialX = "-100%";
    exitX = "100%";
  } else if (direction === "down") {
    initialY = "-100%";
    exitY = "100%";
  } else if (direction === "up") {
    initialY = "100%";
    exitY = "-100%";
  } else {
    initialX = "100%";
    exitX = "-100%";
  }

  return {
    initial: {
      x: initialX,
      y: initialY,
      opacity: 1,
      boxShadow: "-20px 0 50px rgba(0,0,0,0.5)",
    },
    enter: { x: "0%", y: "0%", opacity: 1 },
    exit: { x: exitX, y: exitY, opacity: 1 },
  };
};

const cubeVariants = (direction: Direction) => {
  // 4-Way Cube
  // Note: backfaceVisibility: "hidden" is crucial for solid appearance

  if (direction === "left") {
    return {
      initial: {
        rotateY: 90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 1,
      },
      enter: {
        rotateY: 0,
        opacity: 1,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 2,
      },
      exit: {
        rotateY: -90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 0,
      },
    };
  }
  if (direction === "right") {
    return {
      initial: {
        rotateY: -90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 1,
      },
      enter: {
        rotateY: 0,
        opacity: 1,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 2,
      },
      exit: {
        rotateY: 90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 0,
      },
    };
  }
  if (direction === "down") {
    // Waterfall Down
    return {
      initial: {
        rotateX: 90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 1,
      },
      enter: {
        rotateX: 0,
        opacity: 1,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 2,
      },
      exit: {
        rotateX: -90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 0,
      },
    };
  }
  if (direction === "up") {
    // Waterfall Up
    return {
      initial: {
        rotateX: -90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 1,
      },
      enter: {
        rotateX: 0,
        opacity: 1,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 2,
      },
      exit: {
        rotateX: 90,
        opacity: 0,
        transformOrigin: "50% 50% -400px",
        x: 0,
        y: 0,
        backfaceVisibility: "hidden",
        zIndex: 0,
      },
    };
  }

  // Default
  return {
    initial: {
      rotateY: 90,
      opacity: 0,
      transformOrigin: "50% 50% -400px",
      x: 0,
      y: 0,
      backfaceVisibility: "hidden",
      zIndex: 1,
    },
    enter: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: "50% 50% -400px",
      x: 0,
      y: 0,
      backfaceVisibility: "hidden",
      zIndex: 2,
    },
    exit: {
      rotateY: -90,
      opacity: 0,
      transformOrigin: "50% 50% -400px",
      x: 0,
      y: 0,
      backfaceVisibility: "hidden",
      zIndex: 0,
    },
  };
};

// We define variants where 'enter'/'exit' functions take the custom direction
export const ANIMATIONS: Record<AnimationType, Variants> = {
  fade: {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },

  slide: {
    initial: (d: Direction) => slideVariants(d).initial,
    enter: (d: Direction) => slideVariants(d).enter,
    exit: (d: Direction) => slideVariants(d).exit,
  },

  push: {
    initial: (d: Direction) => pushVariants(d).initial,
    enter: (d: Direction) => pushVariants(d).enter,
    exit: (d: Direction) => pushVariants(d).exit,
  },

  zoom: {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
  },

  blur: {
    initial: { filter: "blur(20px)", opacity: 0 },
    enter: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: "blur(20px)", opacity: 0 },
  },

  scale: {
    initial: (d: Direction) => ({
      scale: d === "left" || d === "down" ? 1.1 : 0.9,
      opacity: 0,
    }),
    enter: { scale: 1, opacity: 1 },
    exit: (d: Direction) => ({
      scale: d === "left" || d === "down" ? 0.9 : 1.1,
      opacity: 0,
    }),
  },

  cube: {
    initial: (d: Direction) => cubeVariants(d).initial,
    enter: (d: Direction) => cubeVariants(d).enter,
    exit: (d: Direction) => cubeVariants(d).exit,
  },

  flip: {
    initial: { rotateX: 90, opacity: 0 },
    enter: { rotateX: 0, opacity: 1 },
    exit: { rotateX: -90, opacity: 0 },
  },

  room: {
    initial: { opacity: 0, scale: 0.8, z: -500 },
    enter: { opacity: 1, scale: 1, z: 0 },
    exit: { opacity: 0, scale: 1.2, z: 200 },
  },

  fold: {
    initial: { opacity: 0, rotateX: 90, transformOrigin: "top" },
    enter: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: -90, transformOrigin: "bottom" },
  },

  swap: {
    initial: (d: Direction) => ({
      x: d === "left" || d === "down" ? "50%" : "-50%",
      scale: 0.5,
      opacity: 0,
      zIndex: 0,
    }),
    enter: { x: "0%", scale: 1, opacity: 1, zIndex: 2 },
    exit: (d: Direction) => ({
      x: d === "left" || d === "down" ? "-50%" : "50%",
      scale: 0.5,
      opacity: 0,
      zIndex: 0,
    }),
  },
};
