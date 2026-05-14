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
          <button className="group relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white hover:text-black">
            <span className="relative z-10">Iniciar Protocolo</span>
          </button>

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
                <a onClick={() => setOpen(false)} href="#contact" className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-medium text-black">Iniciar Protocolo</a>
              </div>
            </nav>
          </div>
        </div>
      )}

    </header>
  );
}