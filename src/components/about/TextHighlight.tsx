"use client";
import { Highlight } from "../ui/hero-highlight";

export function TextHighlight() {
  return (

      <div
        className="ml-[-15px] text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug mx-auto pb-8"
      >
        The Future We Are{" "}
        <Highlight className="text-white">
          Building
        </Highlight>
      </div>

  );
}
