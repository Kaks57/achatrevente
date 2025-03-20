
import { ReactNode } from "react";

export type AnimationProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export const getFadeInAnimation = (delay = 0) => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay / 10,
        duration: 0.5,
      },
    },
  };
};

export const getSlideInAnimation = (direction: "left" | "right" | "up" | "down", delay = 0) => {
  const x = direction === "left" ? -50 : direction === "right" ? 50 : 0;
  const y = direction === "up" ? -50 : direction === "down" ? 50 : 0;

  return {
    hidden: { x, y, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        delay: delay / 10,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

export const getScaleAnimation = (delay = 0) => {
  return {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: delay / 10,
        duration: 0.4,
      },
    },
  };
};
