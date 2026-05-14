"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Reveal brutal e dramático dos textos
    gsap.fromTo(".cta-reveal",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );

    // Efeito de pulso de energia sutil no background
    gsap.to(".cta-glow", {
      opacity: 0.6,
      scale: 1.1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black py-40 px-6 text-center md:py-56">
      
      {/* BACKGROUND EFFECTS */}
      {/* Orb de energia no fundo pra dar profundidade */}
      <div className="cta-glow absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-20 blur-[120px] md:h-[500px] md:w-[500px] md:blur-[150px]" />
      
      {/* Grid sutil para passar a vibe de engenharia */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* CONTEÚDO */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8">
        
        <div className="flex flex-col gap-4">
          <h2 className="cta-reveal text-5xl font-light tracking-tight text-white md:text-8xl">
            O mercado não perdoa <br className="hidden md:block" />
            <span className="font-medium text-zinc-600">a inércia.</span>
          </h2>
        </div>

        <p className="cta-reveal max-w-2xl text-xl font-light leading-relaxed text-zinc-400 md:text-2xl">
          Ou você corta o peso da sua operação e escala com inteligência agora, ou será engolido pelos concorrentes que já fizeram isso. <span className="font-medium text-white">A decisão é matemática.</span>
        </p>

        {/* BOTÃO PREMIUM (Com borda animada) */}
        <div className="cta-reveal mt-8">
          <a href="https://wa.me/5515996192574" target="_blank" rel="noopener noreferrer" className="group relative inline-flex h-16 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-10 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            
            {/* Gradiente giratório (A mágica do CSS) */}
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
              <div className="relative h-full w-12 bg-white/20" />
            </div>
            
            <span className="relative z-10 flex items-center gap-3 text-lg tracking-wide">
              Iniciar Protocolo FlyAI
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>

            {/* Borda interna brilhante */}
            <div className="absolute inset-0 rounded-full border border-white/20 transition-colors duration-300 group-hover:border-white/50" />
          </a>
        </div>

        <span className="cta-reveal mt-4 text-sm font-light tracking-widest text-zinc-600">
          Onboarding Q2 2026 — vagas em análise
        </span>

      </div>
    </section>
  );
}