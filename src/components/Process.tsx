"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Analyze",
    description: "Mapeamento visceral da sua operação. Identificamos os gargalos braçais, fugas de receita e desenhamos o roadmap exato de onde a inteligência vai gerar mais ROI."
  },
  {
    number: "02",
    title: "Architect",
    description: "Engenharia de ponta. Desenhamos a arquitetura de LLMs privados, RAG corporativo e bases vetoriais que vão compor o novo cérebro autônomo da sua empresa."
  },
  {
    number: "03",
    title: "Build",
    description: "Implementação brutal. Nossos especialistas desenvolvem e integram os agentes autônomos ao seu sistema atual, com blindagem absoluta e zero atrito."
  },
  {
    number: "04",
    title: "Scale",
    description: "Operação e expansão. Monitoramos o ecossistema em tempo real, ajustamos os modelos e orquestramos a escala para a sua empresa crescer sem limites."
  }
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Reveal do Cabeçalho
    gsap.fromTo(".process-header",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // 2. A Mágica da Linha Conectora (Blindada com ScaleY)
    gsap.fromTo(".energy-line",
      { scaleY: 0 }, // Começa com escala zero
      {
        scaleY: 1, // Cresce até o final
        transformOrigin: "top center", // Cresce de cima para baixo
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      }
    );

    // 3. Acendendo cada passo (Tipagem forte para evitar erros do TypeScript)
    const stepElements = gsap.utils.toArray<HTMLElement>(".process-step");
    
    stepElements.forEach((step) => {
      // Pega os elementos com segurança
      const node = step.querySelector(".step-node");
      const content = step.querySelector(".step-content");

      // Só anima se realmente encontrar os elementos na tela
      if (node && content) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          }
        });

        tl.to(node, { backgroundColor: "#ffffff", boxShadow: "0 0 20px rgba(255,255,255,0.8)", duration: 0.5 })
          .fromTo(content, { x: 30, opacity: 0.2 }, { x: 0, opacity: 1, duration: 1 }, "<");
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="process" className="relative w-full bg-black py-32 px-6 md:py-48">
      <div className="mx-auto max-w-4xl">
        
        {/* CABEÇALHO */}
        <div className="process-header mb-24 flex flex-col gap-6 md:mb-32">
          <h2 className="text-5xl font-light tracking-tight text-white md:text-7xl">
            Protocolo de <br/>
            <span className="font-medium text-zinc-600">Engenharia.</span>
          </h2>
          <p className="max-w-2xl text-xl font-light text-zinc-400">
            Nós não fazemos testes na sua operação. Executamos um processo cirúrgico, de ponta a ponta, projetado para risco zero e escala máxima.
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="timeline-container relative flex flex-col gap-16 md:gap-24">
          
          {/* A Linha Fundo (Apagada) */}
          <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-white/10 md:left-[23px]" />
          
          {/* A Linha de Energia (Renderizada via GPU com scaleY) */}
          <div 
            className="energy-line absolute left-[15px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-white via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.5)] md:left-[23px]" 
          />

          {/* OS 4 PASSOS */}
          {steps.map((step, index) => (
            <div key={index} className="process-step relative flex items-start gap-8 md:gap-16">
              
              {/* O Nó/Bolinha da Timeline */}
              <div className="relative z-10 flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border border-white/20 bg-black md:h-[48px] md:w-[48px]">
                <div className="step-node h-2 w-2 rounded-full bg-zinc-700 transition-colors duration-300 md:h-3 md:w-3" />
              </div>

              {/* O Conteúdo do Passo */}
              <div className="step-content flex flex-col gap-2 pt-1 md:pt-2">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm tracking-widest text-zinc-500 md:text-base">
                    {step.number}
                  </span>
                  <h3 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-xl text-lg font-light leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}