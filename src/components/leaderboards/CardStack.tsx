"use client";
import { CardStack } from "../ui/card-stack";

export function CardStackSection() {
  return (
    <div>
      <CardStack items={CARDS} />
    </div>
  );
}

const CARDS = [
  {
    id: 0,
    name: "Dunedin Pace, or TruPACE Score",
    designation: "This metric is used to provide insight into how quickly a body is accumulating damage.",
    content: (
      <p>
        These cards are amazing, I want to use them in my
        project. Framer motion is a godsend ngl tbh fam.
      </p>
    ),
  },
  {
    id: 1,
    name: "Social Media Following",
    designation: "Top health educators and influencers from X, Instagram, YouTube and TikTok.",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        deleting it right away because yolo. Instead, I
        would like to call it X.com so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Popular Vote",
    designation: "Biohackers, athletes, and nerds most upvoted for by the community.",
    content: (
      <p>
        The first rule of
        Fight Club is that you do not talk about fight
        club. The second rule of
        Fight club is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
  {
    id: 3,
    name: "World Records",
    designation: "All world records - natty and not natty.",
    content: (
      <p>
        These cards are amazing, I want to use them in my
        project. Framer motion is a godsend ngl tbh fam.
      </p>
    ),
  },
];
