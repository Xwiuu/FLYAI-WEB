"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitora o scroll para ativar o efeito de vidro (Glassmorphism)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    // Animação de entrada do Navbar (Desce suave no carregamento)
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 }
    );
  }, { scope: navRef });

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-zinc-950/70 backdrop-blur-md border-b border-white/5 py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer group">
          {/* Ícone de Raio/Energia da FlyAI */}
          <svg 
            className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="text-xl font-medium tracking-widest text-white">FlyAI</span>
        </div>

        {/* LINKS DE NAVEGAÇÃO (DESKTOP) */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#systems" className="text-sm font-light text-zinc-400 transition-colors hover:text-white">
            Ecossistema
          </a>
          <a href="#cases" className="text-sm font-light text-zinc-400 transition-colors hover:text-white">
            Engenharia
          </a>
          <a href="#process" className="text-sm font-light text-zinc-400 transition-colors hover:text-white">
            Protocolo
          </a>
        </nav>

        {/* BOTÃO CTA (Sempre visível para conversão) */}
        <div className="flex items-center gap-4">
          <button className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent px-6 text-sm font-medium text-white transition-all hover:bg-white hover:text-black">
            <span className="relative z-10">Iniciar Protocolo</span>
          </button>

          {/* MENU MOBILE (Hamburger minimalista) */}
          <button className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 md:hidden">
            <span className="h-[1.5px] w-4 bg-white transition-all"></span>
            <span className="h-[1.5px] w-4 bg-white transition-all"></span>
          </button>
        </div>

      </div>
    </header>
  );
}