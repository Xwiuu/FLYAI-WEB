"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useGsapRefresh from "@/lib/useGsapRefresh";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Card Individual com Efeito de Lanterna
const ServiceCard = ({ 
  title, 
  description, 
  className,
  tag,
  isTouch
}: { 
  title: string; 
  description: string; 
  className?: string;
  tag: string;
  isTouch?: boolean;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    if (isTouch) return; // desliga efeitos pesados em touch
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(isTouch ? 0 : 1)}
      onMouseLeave={() => setOpacity(0)}
      className={`service-card relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/40 p-6 md:p-8 transition-colors hover:border-white/10 hover:bg-zinc-900/40 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity,
          background: isTouch
            ? undefined
            : `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <span className="mb-4 inline-block rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs font-medium tracking-wider text-zinc-400">
            {tag}
          </span>
          <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl lg:text-3xl">{title}</h3>
        </div>
        <p className="font-light leading-relaxed text-zinc-400 text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  // detect touch at init (SSR-safe)
  const [isTouch] = useState<boolean>(() => typeof window !== 'undefined' && (("ontouchstart" in window) || ((navigator.maxTouchPoints ?? 0) > 0)));
  // Debounced ScrollTrigger refresh
  useGsapRefresh();

  useGSAP(() => {
    const cards = gsap.utils.toArray(".service-card");
    gsap.fromTo(cards, 
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1, // Entrada em cascata muito suave
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="systems" className="relative w-full bg-black py-20 px-4 md:py-32 md:px-6 overflow-x-hidden">
      <div className="mx-auto max-w-screen-xl">
        
        {/* CABEÇALHO */}
        <div className="mb-20 flex flex-col gap-6">
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            O ecossistema <br/>
            <span className="text-zinc-600">completo.</span>
          </h2>
          <p className="max-w-2xl text-xl font-light text-zinc-400">
            De infraestrutura robusta a esquadrões de agentes autônomos. Nós arquitetamos o futuro da sua operação.
          </p>
        </div>

        {/* BENTO GRID DE 9 ITENS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          
          <ServiceCard 
            tag="CORE"
            title="Infraestrutura de IA"
            description="O alicerce da sua empresa. Governança de dados, RAG corporativo e integração profunda e segura de modelos no seu próprio ambiente."
            className="md:col-span-2 min-h-[220px]"
            isTouch={isTouch}
          />

          <ServiceCard 
            tag="SYSTEMS"
            title="Sistemas Inteligentes"
            description="Softwares tradicionais são passivos. Construímos sistemas que pensam, aprendem e tomam decisões operacionais autônomas."
            className="md:col-span-1 min-h-[220px]"
            isTouch={isTouch}
          />

          <ServiceCard 
            tag="AUTONOMOUS TEAMS"
            title="Esquadrões de Agentes"
            description="Implantação de times inteiros em IA. Agentes especialistas em tráfego, design, marketing e suporte operando e se comunicando 24/7."
            className="md:col-span-1 min-h-[220px]"
            isTouch={isTouch}
          />

          <ServiceCard 
            tag="MODELS"
            title="LLMs Sob Medida"
            description="Modelos privados treinados exclusivamente com o cérebro e a voz da sua empresa. Sem depender de APIs genéricas."
            className="md:col-span-1 min-h-[220px]"
            isTouch={isTouch}
          />

          <ServiceCard 
            tag="WEB EXPERIENCE"
            title="Interfaces Interativas"
            description="Sites e portais que não são apenas vitrines. Interfaces inteligentes que conversam, reagem e interagem em tempo real com seu time."
            className="md:col-span-1 min-h-[220px]"
            isTouch={isTouch}
          />

          <ServiceCard 
            tag="AUTOMATION"
            title="Orquestração Operacional"
            description="Automação brutal. Conectamos ERPs, CRMs e fluxos soltos para substituir o esforço braçal por processos à prova de falhas."
            className="md:col-span-1 min-h-[220px]"
            isTouch={isTouch}
          />

          <ServiceCard 
            tag="DATA"
            title="Inteligência Operacional"
            description="Análise preditiva em tempo real. Identificamos gargalos invisíveis, otimizamos custos e destravamos a escala."
            className="md:col-span-2 min-h-[220px]"
            isTouch={isTouch}
          />

          <ServiceCard 
            tag="CUSTOM DEV"
            title="Produtos Customizados"
            description="Desenvolvimento end-to-end. Se o mercado não oferece o SaaS ou plataforma que você precisa, nós criamos com IA nativa."
            className="md:col-span-2 min-h-[220px]"
            isTouch={isTouch}
          />

          <ServiceCard 
            tag="ADVISORY"
            title="Consultoria Estratégica"
            description="Desenhamos o mapa antes de acelerar. Mapeamento de operação, descoberta de ROI e arquitetura completa de soluções IA."
            className="md:col-span-1 min-h-[220px]"
            isTouch={isTouch}
          />

        </div>
      </div>
    </section>
  );
}