"use client";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  
  // Replace 'threshold' with 'amount'
  const isInView = useInView(ref, { once: true, amount: 0.9 });

  return (
    <motion.span
      ref={ref}
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={isInView ? { backgroundSize: "100% 100%" } : {}}
      transition={{
        duration: 0.8,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-green-300 to-green-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
