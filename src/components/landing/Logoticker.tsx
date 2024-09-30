"use client"
import Image from "next/image";
import Link from "next/link";
import {motion} from 'framer-motion';
import BioDao from '@/assets/logoTicker/BioDAO.svg';
import CellPress from '@/assets/logoTicker/CellPress.svg'
import CerebrumDAO from '@/assets/logoTicker/CerebrumDAO.svg'
import Nature from '@/assets/logoTicker/nature.svg'
import QS from '@/assets/logoTicker/QS.svg'
import VitaDAO from '@/assets/logoTicker/VitaDao.svg'
import Reddit from '@/assets/logoTicker/rBiohackerTest.svg'


const logos = [  
  { src: BioDao, alt: "BioDAO Logo", link: "https://www.bio.xyz/" },
  { src: CellPress, alt: "CellPress Logo", link: "https://www.cell.com/" },
  { src: CerebrumDAO, alt: "CerebrumDAO Logo", link: "https://www.cerebrumdao.com/" },
  { src: Nature, alt: "Nature Logo", link: "https://www.nature.com/srep/" },
  { src: QS, alt: "QS Logo", link: "https://quantifiedself.com/" },
  { src: VitaDAO, alt: "VitaDAO Logo", link: "https://www.vitadao.com/" },
  { src: Reddit, alt: "Reddit Logo", link: "https://www.reddit.com/r/Biohackers/" },

  { src: BioDao, alt: "BioDAO Logo", link: "https://www.bio.xyz/" },
  { src: CellPress, alt: "CellPress Logo", link: "https://www.cell.com/" },
  { src: CerebrumDAO, alt: "CerebrumDAO Logo", link: "https://www.cerebrumdao.com/" },
  { src: Nature, alt: "Nature Logo", link: "https://www.nature.com/srep/" },
  { src: QS, alt: "QS Logo", link: "https://quantifiedself.com/" },
  { src: VitaDAO, alt: "VitaDAO Logo", link: "https://www.vitadao.com/" },
  { src: Reddit, alt: "Reddit Logo", link: "https://www.reddit.com/r/Biohackers/" },

  { src: BioDao, alt: "BioDAO Logo", link: "https://www.bio.xyz/" },
  { src: CellPress, alt: "CellPress Logo", link: "https://www.cell.com/" },
  { src: CerebrumDAO, alt: "CerebrumDAO Logo", link: "https://www.cerebrumdao.com/" },
  { src: Nature, alt: "Nature Logo", link: "https://www.nature.com/srep/" },
  { src: QS, alt: "QS Logo", link: "https://quantifiedself.com/" },
  { src: VitaDAO, alt: "VitaDAO Logo", link: "https://www.vitadao.com/" },
  { src: Reddit, alt: "Reddit Logo", link: "https://www.reddit.com/r/Biohackers/" },
];

export const LogoTicker = () => {
  return (
    <div id="news" className="py-8 md:py-12 bg-[#F0FDF4]">
      <div className='px-20'>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div 
            className="flex gap-20 flex-none pr-14 max-h-10" // Added max-h-20 class here
            animate={{ translateX: "-50%", }}
            transition={{ duration: 100, repeat: Infinity, ease: 'linear', repeatType: 'loop', }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <Link key={index} href={logo.link} target="_blank" rel="noopener noreferrer">
                <Image 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="logo-ticker-image cursor-pointer h-full w-auto object-contain" // Modified this line
                />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};