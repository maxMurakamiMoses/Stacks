"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "../ui/google-gemini-effect";

export function Hero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 1], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 1], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 1], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 1], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 1], [0, 1.2]);

  return (
    <div
      className="h-[200vh] bg-black w-full dark:border dark:border-white/[0.1] relative pt-40 overflow-clip z-0"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
