"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin();
}

// Algoritmo matemático para criar raios fractais realistas
function createLightning(startX: number, startY: number, endX: number, endY: number) {
  let segments = [{ x: startX, y: startY }, { x: endX, y: endY }];
  let offsetAmount = 100; // O quão "torto" o raio vai ser

  // Quebra a linha reta em vários pedaços e desloca eles (Fractal)
  for (let i = 0; i < 4; i++) {
    const newSegments = [];
    for (let j = 0; j < segments.length - 1; j++) {
      const p1 = segments[j];
      const p2 = segments[j + 1];
      
      const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * offsetAmount;
      const midY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * offsetAmount;
      
      newSegments.push(p1);
      newSegments.push({ x: midX, y: midY });
    }
    newSegments.push(segments[segments.length - 1]);
    segments = newSegments;
    offsetAmount /= 2;
  }

  // Transforma as coordenadas numa string de caminho SVG (Path)
  return `M ${segments.map((p) => `${p.x},${p.y}`).join(" L ")}`;
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({ w: 1000, h: 1000 });

  // Pega o tamanho real da tela para os raios saberem até onde ir
  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useGSAP(() => {
    // 1. Reveal majestoso dos textos
    gsap.fromTo(".hero-reveal", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }
    );

    // 2. A Mágica da Tempestade de Plasma Automática
    const strikes = gsap.utils.toArray<SVGPathElement>(".lightning-strike");
    
    const fireStrike = (path: SVGPathElement) => {
      const cx = dimensions.w / 2;
      const cy = dimensions.h / 2;
      
      // Escolhe um alvo aleatório para atirar o raio (Gira 360 graus)
      const angle = Math.random() * Math.PI * 2;
      const length = Math.max(dimensions.w, dimensions.h) * (0.4 + Math.random() * 0.4);
      
      const targetX = cx + Math.cos(angle) * length;
      const targetY = cy + Math.sin(angle) * length;

      // Desenha o raio
      path.setAttribute("d", createLightning(cx, cy, targetX, targetY));
      
      // Animação do brilho explosivo (Aparece forte e apaga rápido)
      gsap.fromTo(path,
        { opacity: Math.random() * 0.6 + 0.4, strokeWidth: Math.random() * 3 + 1 },
        { 
          opacity: 0,
          duration: 0.05 + Math.random() * 0.15, // Duração de um piscar de olhos
          ease: "power4.out",
          onComplete: () => {
            // Agenda o próximo tiro desse mesmo raio (aleatório entre 0.2 e 1.5 segundos)
            gsap.delayedCall(Math.random() * 1.5 + 0.2, () => fireStrike(path));
          }
        }
      );
    };

    // Dá o start em todos os raios (com um delay aleatório pra não atirarem juntos)
    strikes.forEach((path) => {
      setTimeout(() => fireStrike(path), Math.random() * 1000);
    });

  }, { scope: containerRef, dependencies: [dimensions] });

  return (
    <section 
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 pt-20"
    >
      {/* O GERADOR DE TEMPESTADE (SVG em tela cheia) */}
      <svg 
        className="pointer-events-none absolute inset-0 z-10 h-full w-full mix-blend-screen" 
        viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
        preserveAspectRatio="none"
      >
        {/* Glow de energia estática no centro (Atrás do FlyAI) */}
        <circle 
          cx={dimensions.w / 2} 
          cy={dimensions.h / 2} 
          r="150" 
          fill="rgba(255, 255, 255, 0.03)" 
          className="blur-[50px]" 
        />
        
        {/* 6 Raios independentes para criar a tempestade */}
        {[...Array(6)].map((_, i) => (
          <path 
            key={i}
            className="lightning-strike" 
            stroke="white" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
            style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }} // Brilho no CSS pra não pesar
          />
        ))}
      </svg>

      {/* CONTEÚDO PRINCIPAL (Blindado e Intacto) */}
      <div className="relative z-20 flex w-full max-w-4xl flex-col items-center text-center">
        
        {/* A Marca Soberana */}
        <h1 className="hero-reveal mb-8 text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] sm:text-8xl md:text-[10rem]">
          FlyAI
        </h1>

        {/* A Copy Absoluta */}
        <p className="hero-reveal mb-12 max-w-2xl text-lg font-light leading-relaxed text-zinc-300 sm:text-xl">
          Nós não criamos ferramentas. Arquitetamos infraestruturas de inteligência autônoma que orquestram e escalam a sua operação.
        </p>

        {/* Botão de Protocolo */}
        <div className="hero-reveal flex gap-4">
          <button className="group relative flex h-14 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white px-10 font-medium text-black transition-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <span className="relative z-10 flex items-center gap-2">
              Iniciar Protocolo
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}