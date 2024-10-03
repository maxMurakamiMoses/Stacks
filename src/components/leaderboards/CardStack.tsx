"use client";
import { CardStack } from "../ui/card-stack";
// import testImage from "../../assets/test.png"; // Remove if not using

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
    designation:
      "This metric is used to provide insight into how quickly a body is accumulating damage.",
    emoji: "⏱️", // Stopwatch emoji
  },
  {
    id: 1,
    name: "Social Media Following",
    designation:
      "Top health educators and influencers from X, Instagram, YouTube and TikTok.",
    emoji: "📱", // Mobile phone emoji
  },
  {
    id: 2,
    name: "Community Voted",
    designation:
      "Biohackers, athletes, and nerds most upvoted for by the community.",
    emoji: "🏆", // Trophy emoji
  },
];
