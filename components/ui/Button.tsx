"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden";

  const variantStyles = {
    primary:
      "bg-accent-primary text-background-primary hover:bg-accent-primary/90",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${
    isDisabled ? disabledStyles : ""
  } ${className}`;

  return (
    <motion.button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={buttonStyles}
      whileHover={isDisabled ? {} : { scale: 1.05 }}
      whileTap={isDisabled ? {} : { scale: 0.95 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
