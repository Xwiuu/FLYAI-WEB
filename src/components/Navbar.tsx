"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer group">
          {/* Ícone de Raio/Energia da FlyAI */}
          <svg
            className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 500.000000 500.000000"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
              <path d="M2252 4095 c-347 -64 -614 -207 -870 -466 -211 -213 -373 -532 -427
-844 -112 -640 164 -1295 697 -1653 451 -303 1031 -345 1509 -108 335 167 583
417 744 751 200 415 220 868 58 1305 -151 410 -483 755 -886 921 -102 42 -208
71 -337 94 -105 19 -385 18 -488 0z m568 -282 c-1 -34 -164 -1024 -176 -1065
-5 -17 13 -18 270 -18 152 0 276 -3 276 -6 0 -3 -38 -65 -84 -137 -46 -73
-100 -157 -119 -187 -19 -30 -64 -100 -99 -155 -36 -55 -75 -118 -88 -140 -13
-22 -61 -97 -107 -167 -46 -71 -83 -130 -83 -132 0 -6 -118 -191 -171 -268
-21 -31 -39 -59 -39 -63 0 -9 -192 -306 -196 -302 -3 2 148 1084 160 1150 l6
27 -271 0 -271 0 20 33 c20 31 150 261 339 602 52 93 119 210 149 261 29 50
57 99 60 109 4 10 51 94 106 188 54 93 98 172 98 175 0 2 14 29 31 58 l30 54
80 0 c69 0 79 -2 79 -17z"/>
            </g>
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
          <a href="https://wa.me/5515996192574" target="_blank" rel="noopener noreferrer" className="group relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white hover:text-black">
            <span className="relative z-10">Iniciar Protocolo</span>
          </a>

          {/* MENU MOBILE (Hamburger minimalista) */}
          <button aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden">
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="md:hidden">
          <div className="absolute right-4 top-full mt-2 z-40 w-[calc(100%-32px)] max-w-sm rounded-xl bg-zinc-950/95 border border-white/5 p-4 backdrop-blur-md">
            <nav className="flex flex-col gap-3">
              <a onClick={() => setOpen(false)} href="#systems" className="block rounded-md px-3 py-3 text-sm font-medium text-zinc-300 hover:bg-white/5">Ecossistema</a>
              <a onClick={() => setOpen(false)} href="#cases" className="block rounded-md px-3 py-3 text-sm font-medium text-zinc-300 hover:bg-white/5">Engenharia</a>
              <a onClick={() => setOpen(false)} href="#process" className="block rounded-md px-3 py-3 text-sm font-medium text-zinc-300 hover:bg-white/5">Protocolo</a>
              <div className="mt-2 border-t border-white/5 pt-3">
                <a onClick={() => setOpen(false)} href="https://wa.me/5515996192574" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-medium text-black">Iniciar Protocolo</a>
              </div>
            </nav>
          </div>
        </div>
      )}

    </header>
  );
}