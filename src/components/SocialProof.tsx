"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  // Refs para os contadores e pro letreiro
  const metric1Ref = useRef<HTMLSpanElement>(null);
  const metric2Ref = useRef<HTMLSpanElement>(null);
  const metric3Ref = useRef<HTMLSpanElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Reveal suave de toda a seção
      gsap.fromTo(
        ".proof-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // 2. O Contador Blindado (Usa um proxy pra não bugar o React)
      const animateCounter = (
        ref: React.RefObject<HTMLSpanElement | null>,
        endValue: number,
        isDecimal = false,
      ) => {
        const proxy = { val: 0 }; // Objeto fantasma que o GSAP vai animar

        gsap.to(proxy, {
          val: endValue,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          onUpdate: () => {
            if (ref.current) {
              // Atualiza a tela de forma segura
              ref.current.innerText = isDecimal
                ? proxy.val.toFixed(1)
                : Math.floor(proxy.val).toString();
            }
          },
        });
      };

      animateCounter(metric1Ref, 99.9, true);
      animateCounter(metric2Ref, 10, false);
      animateCounter(metric3Ref, 24, false);

      // 3. Marquee Infinito feito no GSAP (Zero erro de CSS no Next.js)
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50, // Move 50% do tamanho total (que é duplicado) para a esquerda
          ease: "none",
          duration: 25, // Velocidade do letreiro
          repeat: -1, // Loop infinito
        });
      }
    },
    { scope: sectionRef },
  );

  const logos = [
    "ENTERPRISE",
    "VENTURES",
    "GLOBAL OPS",
    "TECH LABS",
    "FINANCE",
    "LOGISTICS",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black py-32 px-6"
    >
      {/* Container Principal */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-24">
        {/* AS MÉTRICAS DE IMPACTO */}
        <div className="grid w-full grid-cols-1 gap-12 border-y border-white/10 py-16 md:grid-cols-3 md:gap-6">
          <div className="proof-reveal flex flex-col items-center justify-center text-center">
            <h3 className="text-6xl font-medium tracking-tighter text-white md:text-8xl">
              <span ref={metric1Ref}>0</span>%
            </h3>
            <p className="mt-4 text-sm font-medium tracking-widest text-zinc-500 uppercase">
              Uptime & Estabilidade
            </p>
          </div>

          <div className="proof-reveal flex flex-col items-center justify-center text-center">
            <h3 className="text-6xl font-medium tracking-tighter text-white md:text-8xl">
              <span ref={metric2Ref}>0</span>x
            </h3>
            <p className="mt-4 text-sm font-medium tracking-widest text-zinc-500 uppercase">
              Velocidade de Execução
            </p>
          </div>

          <div className="proof-reveal flex flex-col items-center justify-center text-center">
            <h3 className="text-6xl font-medium tracking-tighter text-white md:text-8xl">
              <span ref={metric3Ref}>0</span>/7
            </h3>
            <p className="mt-4 text-sm font-medium tracking-widest text-zinc-500 uppercase">
              Operação Autônoma
            </p>
          </div>
        </div>
      </div>

      {/* MARQUEE INFINITO (Sem CSS customizado, só poder do GSAP e Tailwind) */}
      <div className="proof-reveal relative mt-32 flex w-full overflow-hidden border-y border-white/5 bg-zinc-950/30 py-8">
        <div className="absolute left-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute right-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent"></div>

        {/* A div que o GSAP vai mover eternamente */}
        <div ref={marqueeRef} className="flex w-max items-center">
          {/* Repeti as logos 4 vezes pra dar o efeito infinito sem quebrar */}
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="mx-12 flex items-center gap-3 opacity-30 grayscale transition-opacity hover:opacity-100"
            >
              <div className="h-6 w-6 rounded-sm bg-zinc-600"></div>
              <span className="text-xl font-medium tracking-widest text-white">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
