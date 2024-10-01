// import { fetchCars } from "@utils";
import { HomeProps } from "@/types/db";
import  SearchBar  from "@/components/marketplace/SearchBar";
import { Hero } from '@/components/marketplace/HeroParallax';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

export default async function Home({ searchParams }: HomeProps) {

  return (
    <div className={robotoMono.className}>
      <main className='overflow-hidden'>
        <Hero />
      </main>
    </div>
  );
}
