// components/NavbarComponent.tsx

"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarComponent() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-[50]", className)}
    >
      <Menu setActive={setActive}>
        {/* "Home" MenuItem with href */}
        <MenuItem setActive={setActive} active={active} item="Home" href="/">
          <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/" setActive={setActive}>Home</HoveredLink>
            <HoveredLink href="/about" setActive={setActive}>About</HoveredLink>
            <HoveredLink href="/about#faq" setActive={setActive}>FAQ</HoveredLink>
            <div className="lg:hidden"> {/* Hide on large screens and up */}
              <HoveredLink href='/sign-in'>Sign in</HoveredLink>
            </div>
          </div>
        </MenuItem>

        {/* "Explore" MenuItem */}
        <MenuItem setActive={setActive} active={active} item="Explore">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="News"
              href="/#news"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="The stuff you are putting into your body daily - yeah you might want to be informed."
              setActive={setActive}
            />
            <ProductItem
              title="Leaderboards"
              href="/leaderboards"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Browse through leaderboards to discover people pushing the boundaries."
              setActive={setActive}
            />
            <ProductItem
              title="Marketplace"
              href="/marketplace" // Fixed typo from '/gagets' to '/gadgets'
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Discover cool new gadgets biohackers, nerds, and athletes are using."
              setActive={setActive}
            />
            <ProductItem
              title="Stacks"
              href="/stacks"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Tools and resources to live a long, prosperous, and healthy life."
              setActive={setActive}
            />
          </div>
        </MenuItem>

        {/* "Follow" MenuItem */}
        <MenuItem setActive={setActive} active={active} item="Follow">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="https://www.localharvest.org/organic-farms/">Join the Newsletter</HoveredLink>
            <HoveredLink href="https://www.ewg.org/foodnews/dirty-dozen.php">X (Twitter)</HoveredLink>
            <HoveredLink href="/team">Farcaster</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
