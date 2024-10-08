"use client";
import { Highlight } from "../ui/hero-highlight";

export function TextHighlight() {
  return (

      <div
        className="ml-[-15px] px-4 text-4xl lg:text-6xl font-bold text-black max-w-4xl leading-relaxed lg:leading-snug mx-auto pb-8"
      >
        The Future We Are{" "}
        <Highlight className="text-[#F0FDF4]">
          Building
        </Highlight>
      </div>

  );
}
