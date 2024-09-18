"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

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
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-20", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Why</HoveredLink>
            <HoveredLink href="/">How</HoveredLink>
            <HoveredLink href="/">Mission</HoveredLink>
            <HoveredLink href="/">FAQ</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Explore">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="News"
              href="/news"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Stay up to date on health related news."
            />
            <ProductItem
              title="Leaderboards"
              href="/leaderboards"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Browse through leaderboards to discover people pushing the boundries."
            />
            {/* <ProductItem
              title="Products"
              href="/products"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="The top products being used by biohackers, atheltes, and nerds."
            />
            <ProductItem
              title="Tools"
              href="/tools"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Tools and resources to live a long, prosperous, and healthy life."
            /> */}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Follow">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">YouTube</HoveredLink>
            <HoveredLink href="/individual">X</HoveredLink>
            <HoveredLink href="/team">Instgram</HoveredLink>
            <HoveredLink href="/enterprise">TikTok</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
     
    </div>
  );
}
