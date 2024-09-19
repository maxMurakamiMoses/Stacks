"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  // State to track cursor blinking rounds
  const [repeatCount, setRepeatCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  useEffect(() => {
    if (repeatCount < 20) {
      const interval = setInterval(() => {
        setRepeatCount((prev) => prev + 1);
      }, 1600); // Adjust the interval based on your cursor blink speed

      return () => clearInterval(interval);
    }
  }, [repeatCount]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  
  return (
    <div
      className={cn(
        "text-[60px] lg:text-[70px] xl:text-[86px] font-bold",
        className
      )}
      style={{ whiteSpace: 'nowrap' }}
    >
      {renderWords()}
      {repeatCount < 4 && (
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "inline-block rounded-sm w-[4px] h-10 lg:h-14 xl:h-16 bg-blue-500",
            cursorClassName
          )}
        ></motion.span>
      )}
    </div>
  );
};
