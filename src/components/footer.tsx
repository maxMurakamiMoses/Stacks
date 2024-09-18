"use client"
import Image from "next/image";
// import logo from "@/assets/logosaas.png";
import SocialX from "@/assets/footer/social-x.svg";
import SocialInsta from "@/assets/footer/social-insta.svg";
import SocialYoutube from "@/assets/footer/social-youtube.svg";
import TikTok from '@/assets/footer/tiktok.svg'

export const Footer = () => {
  return (
    <footer className='bg-black text-[#BCBCBC] text-sm py-10 text-center w-full'>
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F87BFF] via-[#FB92CF] via-[#FFDD9B] via-[#C2F0B1] to-[#2FD8FE] blur-md"></div>
        {/* <Image src={logo} height={40} alt="SaaS logo" className="relative z-10"/> */}
      </div>
      <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6 w-full">
        <a href="/">Home</a>
        <a href="/news">News</a>
        <a href="/leaderboards">Leaderboards</a>
        <a href="/products">Prodcuts</a>
        <a href="/tools">Tools</a>
        <a href="mailto:max.mtesting@gmail.com">Contact</a>
      </nav>
      <div className="flex justify-center gap-6 mt-6 w-full">
        <Image src={SocialX} alt="Social X"/>
        <Image src={SocialInsta} alt="Social Insta"/>
        <Image src={TikTok} alt="Tiktok Pin"/>
        <Image src={SocialYoutube} alt="Social Youtube"/>
      </div>
      <p className="mt-6">&copy; 2024 Stacks, Inc. All rights reserved.</p>
    </footer>
  );
};
