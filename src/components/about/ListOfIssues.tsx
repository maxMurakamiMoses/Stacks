"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import PayWall from "@/assets/ListOfIssues/paywall2.png";
import ReplicationCrisis from "@/assets/ListOfIssues/replicationCrisis.png";
import BigPharma from "@/assets/ListOfIssues/bigPharma.png";
import BottleNeck from "@/assets/ListOfIssues/bottleneck.png";

export function ListofIssues() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 rounded-tr-lg rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {/* {active.description} */}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-14 w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "It&apos;s a surprising and unfortunate...",
    title: "🔒 Research Behind Closed Walls",
    src: PayWall,
    ctaText: "Open",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          It&apos;s a surprising and unfortunate fact that the majority of the
          world&apos;s research, mostly conducted with public funding, is kept behind
          paywalls run by a tiny number of publishing corporations.
        </p>
      );
    },
  },
  {
    description: "Journal publishers&apos; central claim...",
    title: "📉 Declining Research Quality",
    src: ReplicationCrisis,
    ctaText: "Open",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Journal publishers&apos; central claim is that they act as safeguards of
          quality. Yet the fact that the replication crisis that first emerged
          in psychology in the early 2010&apos;s has since spread to numerous other
          fields suggests the publishers aren&apos;t adding nearly as much value in
          this area as they claim.
        </p>
      );
    },
  },
  {
    description: "Innovation in the pharmaceutical...",
    title: "🚫 Lack of Innovation",
    src: BigPharma,
    ctaText: "Open",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Innovation in the pharmaceutical industry isn&apos;t merely slow&mdash;it&apos;s
          actively discouraged. The relationship between Big Pharma and the FDA
          has evolved into a symbiotic partnership that inadvertently suppresses
          progress. The FDA favors large pharmaceutical companies capable of
          navigating its complex Clinical Investigation Design (CID)
          requirements. Big Pharma welcomes the FDA&apos;s stringent protocols, as
          they create formidable barriers to entry for smaller, more innovative
          competitors. This system doesn&apos;t just slow innovation; it creates an
          environment where groundbreaking ideas from nimble startups are
          stifled before they can reach fruition. The result&quest; A pharmaceutical
          landscape dominated by incremental improvements rather than
          revolutionary breakthroughs.
        </p>
      );
    },
  },
  {
    description: "The modern FDA seems more concerned...",
    title: "🏛️ Bureaucratic Bottlenecks",
    src: BottleNeck,
    ctaText: "Open",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          The modern FDA seems more concerned with avoiding negative publicity
          than achieving tangible health outcomes. A prime example of this is
          the phenomenon known as drug lag. When a potentially life-saving drug
          is delayed for months or even years in the approval process, there&apos;s
          an invisible but very real cost in human lives. This excess mortality
          can be directly attributed to the FDA&apos;s sluggish bureaucracy. The true
          tragedy lies in the fact that these deaths are often overlooked. As
          economist Alex Tabarrok poignantly observes&colon; &quot;People still die, but
          the bodies are buried in an invisible graveyard.&quot;
        </p>
      );
    },
  },
];
