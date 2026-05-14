"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useGsapRefresh from "@/lib/useGsapRefresh";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isTouch] = useState<boolean>(() => typeof window !== "undefined" && (("ontouchstart" in window) || ((navigator.maxTouchPoints ?? 0) > 0)));

  // Debounced ScrollTrigger refresh
  useGsapRefresh();

  useGSAP(() => {
    // 1. Reveal dos Mockups
    const mockups = gsap.utils.toArray(".mockup-window");
    gsap.fromTo(
      mockups,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: isTouch ? 0.05 : 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // MOCKUP 1: Animação dos Nodes (reduzido em touch)
    gsap.to(".node-pulse", {
      scale: isTouch ? 1.08 : 1.3,
      opacity: isTouch ? 0.6 : 0.4,
      duration: isTouch ? 2.2 : 1.2,
      yoyo: true,
      repeat: -1,
      stagger: isTouch ? 0.6 : 0.2,
      ease: "power1.inOut",
    });

    // MOCKUP 2: Animação das Barras (Blindada com ScaleY)
    gsap.to(".bar-animate", {
      scaleY: isTouch ? 0.6 : 0.3,
      duration: isTouch ? 1.2 : 0.8,
      yoyo: true,
      repeat: -1,
      stagger: isTouch ? 0.2 : 0.1,
      ease: "power2.inOut",
    });

    // MOCKUP 3: Vector Cells (Blindado com Opacidade Clássica)
    gsap.to(".vector-cell", {
      opacity: isTouch ? 0.6 : 0.2,
      duration: isTouch ? 0.6 : 0.4,
      stagger: { each: isTouch ? 0.2 : 0.1, from: "center", grid: "auto" },
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // MOCKUP 4: Pulsos Neurais
    gsap.to(".neural-link", {
      opacity: isTouch ? 0.5 : 1,
      duration: isTouch ? 1.2 : 0.6,
      stagger: { each: isTouch ? 0.2 : 0.1, from: "start" },
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="cases" className="relative w-full bg-black py-20 px-4 md:py-32 md:px-6 overflow-x-hidden">
      <div className="mx-auto max-w-screen-xl">
        
        {/* CABEÇALHO */}
        <div className="mb-12 flex flex-col gap-4 md:items-center md:text-center">
          <h2 className="text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            A anatomia de uma <br className="hidden md:block" />
            <span className="font-medium text-zinc-600">operação inteligente.</span>
          </h2>
          <p className="max-w-2xl text-base font-light text-zinc-400">
            Veja a inteligência em tempo real. Nós não entregamos caixas pretas. Você tem controle e visualização absoluta sobre cada camada da sua IA.
          </p>
        </div>

        {/* GRID DOS 4 MOCKUPS (2x2 no Desktop) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8">
          
          {/* MOCKUP 1: AGENT WORKFLOW */}
          <div className="mockup-window flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/40">
            <div className="border-b border-white/5 bg-white/5 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-medium tracking-widest text-zinc-500">ORQUESTRAÇÃO DE AGENTES</span>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-zinc-700"></div>
                <div className="h-2 w-2 rounded-full bg-white/50 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
              </div>
            </div>
            
            <div className="relative flex h-64 items-center justify-center p-8">
              <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M20,50 L50,20 L80,50 L50,80 Z" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M50,20 L50,80 M20,50 L80,50" fill="none" stroke="white" strokeWidth="0.5" />
              </svg>
              
              <div className="relative z-10 flex h-full w-full items-center justify-center">
                <div className="absolute top-1/4 left-1/4 node-pulse h-4 w-4 rounded-full bg-zinc-400" />
                <div className="absolute bottom-1/4 left-1/3 node-pulse h-6 w-6 rounded-full bg-zinc-600" />
                <div className="absolute top-1/3 right-1/4 node-pulse h-5 w-5 rounded-full bg-zinc-500" />
                <div className="absolute bottom-1/4 right-1/3 node-pulse h-3 w-3 rounded-full bg-zinc-300" />
                
                <div className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                  <div className="h-8 w-8 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] animate-pulse" />
                </div>
              </div>
            </div>
            <div className="px-8 pb-8 flex-1">
              <h3 className="text-xl font-medium text-white">Multi-Agent Workflow</h3>
              <p className="mt-2 text-sm font-light text-zinc-400">LLMs colaborando entre si para triagem, qualificação e execução em milissegundos.</p>
            </div>
          </div>

          {/* MOCKUP 2: OPERATIONAL DASHBOARD */}
          <div className="mockup-window flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/40">
            <div className="border-b border-white/5 bg-white/5 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-medium tracking-widest text-zinc-500">OPERATIONAL INTELLIGENCE</span>
              <span className="text-xs font-medium tracking-widest text-emerald-500 animate-pulse">LIVE</span>
            </div>
            
            <div className="relative flex h-64 flex-col items-start justify-end gap-2 p-8 pt-16">
              <div className="absolute top-6 left-8 flex flex-col gap-1">
                <span className="text-xs font-mono text-zinc-500">SYS_LOAD: 12%</span>
                <span className="text-xs font-mono text-zinc-500">REQ/s: 4.2k</span>
              </div>
              <div className="flex h-full w-full items-end gap-2 border-b border-white/10 pb-4">
                {/* 12 barras com alturas pré-definidas para evitar erro de hidratação */}
                {[80, 40, 100, 60, 30, 90, 50, 70, 40, 100, 20, 80].map((h, i) => (
                  <div key={i} className="flex h-full w-full flex-1 items-end justify-center origin-bottom">
                    <div 
                      className="bar-animate w-full rounded-t-sm bg-gradient-to-t from-zinc-700 to-zinc-300 origin-bottom"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="px-8 pb-8 flex-1">
              <h3 className="text-xl font-medium text-white">Data Visualization</h3>
              <p className="mt-2 text-sm font-light text-zinc-400">Métricas puras em tempo real do ecossistema operando e reduzindo seus custos.</p>
            </div>
          </div>

          {/* MOCKUP 3: VECTOR DB & RAG */}
          <div className="mockup-window flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/40">
            <div className="border-b border-white/5 bg-white/5 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-medium tracking-widest text-zinc-500">VECTOR SEMANTIC SEARCH</span>
              <span className="text-xs font-mono tracking-widest text-zinc-600">RAG_EMBEDDING</span>
            </div>
            
            <div className="relative flex h-64 flex-col p-8 justify-center">
              <div className="mb-4 flex w-full items-center rounded border border-white/5 bg-black/50 px-3 py-2">
                <span className="text-xs font-mono text-zinc-400 animate-pulse">{">"} QUERY MATCHING...</span>
              </div>
              <div className="grid h-full w-full grid-cols-8 gap-2">
                {[...Array(32)].map((_, i) => (
                  <div key={i} className="vector-cell h-full w-full rounded-sm bg-zinc-600 border border-white/5 opacity-100"></div>
                ))}
              </div>
            </div>
            <div className="px-8 pb-8 flex-1">
              <h3 className="text-xl font-medium text-white">LLM Context Retrieval</h3>
              <p className="mt-2 text-sm font-light text-zinc-400">Transformamos toda a sua base de dados (PDFs, planilhas) em memória ativa e instantânea.</p>
            </div>
          </div>

          {/* MOCKUP 4: NEURAL ROUTING */}
          <div className="mockup-window flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/40">
            <div className="border-b border-white/5 bg-white/5 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-medium tracking-widest text-zinc-500">NEURAL DECISION ENGINE</span>
              <span className="text-xs font-mono tracking-widest text-zinc-600">ROUTING</span>
            </div>
            
            <div className="relative flex h-64 items-center justify-center p-8">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <path className="neural-link opacity-20" d="M15,25 L50,15" stroke="white" strokeWidth="0.5" fill="none" />
                <path className="neural-link opacity-20" d="M15,25 L50,50" stroke="white" strokeWidth="0.5" fill="none" />
                <path className="neural-link opacity-20" d="M15,50 L50,50" stroke="white" strokeWidth="0.5" fill="none" />
                <path className="neural-link opacity-20" d="M15,50 L50,85" stroke="white" strokeWidth="0.5" fill="none" />
                <path className="neural-link opacity-20" d="M15,75 L50,50" stroke="white" strokeWidth="0.5" fill="none" />
                <path className="neural-link opacity-20" d="M15,75 L50,85" stroke="white" strokeWidth="0.5" fill="none" />
                
                <path className="neural-link opacity-20" d="M50,15 L85,35" stroke="white" strokeWidth="0.5" fill="none" />
                <path className="neural-link opacity-20" d="M50,50 L85,35" stroke="white" strokeWidth="0.5" fill="none" />
                <path className="neural-link opacity-20" d="M50,50 L85,65" stroke="white" strokeWidth="0.5" fill="none" />
                <path className="neural-link opacity-20" d="M50,85 L85,65" stroke="white" strokeWidth="0.5" fill="none" />

                <circle cx="15" cy="25" r="3" fill="#52525b" />
                <circle cx="15" cy="50" r="3" fill="#e4e4e7" className="shadow-[0_0_10px_white]" />
                <circle cx="15" cy="75" r="3" fill="#52525b" />
                
                <circle cx="50" cy="15" r="3.5" fill="#a1a1aa" />
                <circle cx="50" cy="50" r="4" fill="#ffffff" />
                <circle cx="50" cy="85" r="3.5" fill="#a1a1aa" />
                
                <circle cx="85" cy="35" r="4.5" fill="#ffffff" />
                <circle cx="85" cy="65" r="3" fill="#52525b" />
              </svg>
            </div>
            <div className="px-8 pb-8 flex-1">
              <h3 className="text-xl font-medium text-white">Autonomous Routing</h3>
              <p className="mt-2 text-sm font-light text-zinc-400">O modelo analisa a intenção do cliente, cruza com seu sistema e executa a ação sozinho.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}