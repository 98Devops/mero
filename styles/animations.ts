import { Variants } from "framer-motion";

// Enhanced card hover with 3D tilt effect
export const cardHoverVariant: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 0 0 rgba(0, 245, 255, 0)",
  },
  hover: {
    y: -12,
    scale: 1.02,
    boxShadow: "0 25px 50px rgba(0, 245, 255, 0.2)",
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1], // Custom easing for smooth feel
    },
  },
};

// Animated gradient mesh background
export const gradientVariant: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 15,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// Enhanced fade in with multiple directions
export const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export const fadeInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export const fadeInRightVariant: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Scale and fade
export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Stagger container with faster timing
export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Fast stagger for grids
export const staggerFastVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Floating animation for hero elements
export const floatVariant: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// Pulse animation for icons
export const pulseVariant: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// Shimmer effect
export const shimmerVariant: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// Image zoom on hover
export const imageZoomVariant: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Reveal animation with clip path
export const revealVariant: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Button ripple effect
export const buttonVariant: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};
