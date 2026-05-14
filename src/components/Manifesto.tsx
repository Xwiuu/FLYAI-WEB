"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRayRef = useRef<SVGPathElement>(null);
  const glowRayRef = useRef<SVGPathElement>(null);
  const branch1Ref = useRef<SVGPathElement>(null);
  const branch2Ref = useRef<SVGPathElement>(null);
  const lightOrbRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. ANIMAÇÃO DO TEXTO (Mask Reveal)
    const lines = gsap.utils.toArray(".mask-text");
    gsap.from(lines, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: "120%",
      opacity: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: "power4.out",
    });

    // 2. A MÁGICA DO RAIO PREMIUM
    const paths = [mainRayRef.current, glowRayRef.current, branch1Ref.current, branch2Ref.current];
    
    paths.forEach((path) => {
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 80%",
            scrub: 1, // Suavidade do desenho
          },
        });
      }
    });

    // 3. A PARTÍCULA DE LUZ (Desce junto com o raio)
    gsap.fromTo(lightOrbRef.current, 
      { top: "0%" },
      {
        top: "100%",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );

    // 4. EFEITO DE CINTILAÇÃO (Flicker elétrico contínuo)
    gsap.to([mainRayRef.current, glowRayRef.current], {
      opacity: 0.6,
      duration: 0.1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      delay: 1, // Começa a piscar levemente depois que a seção carrega
    });

  }, { scope: containerRef });

  // Paths desenhados matematicamente para parecerem raios orgânicos
  const mainPath = "M50,0 C45,100 60,150 50,250 C40,350 55,450 45,550 C35,650 65,750 50,850 C40,950 50,1000 50,1000";
  const branchPath1 = "M50,250 C65,280 75,300 70,330";
  const branchPath2 = "M45,550 C30,580 20,600 25,630";

  return (
    <section ref={containerRef} className="relative flex w-full flex-col items-center justify-center bg-black py-40 md:py-72 px-6 text-center overflow-hidden">
      
      {/* O RAIO DE ALTA ENERGIA (Background) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60">
        
        {/* A partícula de luz que desce iluminando tudo */}
        <div className="absolute top-0 h-full w-[200px] max-w-[200px]">
          <div 
            ref={lightOrbRef}
            className="absolute left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-20 blur-[40px]"
          />
        </div>

        <svg 
          viewBox="0 0 100 1000" 
          fill="none" 
          className="h-[150%] w-auto max-w-[200px]"
          preserveAspectRatio="none"
        >
          {/* CAMADA 1: Glow Gigante e Suave (Plasma) */}
          <path 
            d={mainPath} 
            stroke="white" 
            strokeWidth="12" 
            className="blur-[16px] opacity-20"
            strokeLinecap="round" 
          />
          {/* CAMADA 2: Glow Intenso (Halo Elétrico) */}
          <path 
            ref={glowRayRef}
            d={mainPath} 
            stroke="white" 
            strokeWidth="6" 
            className="blur-[6px] opacity-60"
            strokeLinecap="round" 
          />
          {/* CAMADA 3: O Fio Condutor (Linha Branca Fina) */}
          <path 
            ref={mainRayRef}
            d={mainPath} 
            stroke="white" 
            strokeWidth="1.5" 
            className="opacity-100"
            strokeLinecap="round" 
          />

          {/* RAMIFICAÇÕES (Faiscas escapando) */}
          <path ref={branch1Ref} d={branchPath1} stroke="white" strokeWidth="1" className="opacity-50 blur-[1px]" strokeLinecap="round" />
          <path ref={branch2Ref} d={branchPath2} stroke="white" strokeWidth="1" className="opacity-50 blur-[1px]" strokeLinecap="round" />
        </svg>
      </div>

      {/* O TEXTO (Foreground) */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center gap-2 md:gap-4">
        
        {/* BLOCO 1 */}
        <div className="overflow-hidden pb-2">
          <h2 className="mask-text text-4xl font-light tracking-tight text-zinc-500 md:text-6xl">
            A inércia mantém operações
          </h2>
        </div>
        <div className="overflow-hidden pb-2">
          <h2 className="mask-text text-4xl font-light tracking-tight text-zinc-500 md:text-6xl">
            presas ao <span className="text-zinc-600">chão.</span>
          </h2>
        </div>

        <div className="h-16 md:h-24"></div>

        {/* BLOCO 2 */}
        <div className="overflow-hidden pb-2">
          <h2 className="mask-text text-4xl font-light tracking-tight text-white md:text-6xl drop-shadow-md">
            Nós somos o <span className="font-medium drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">raio de inteligência</span>
          </h2>
        </div>
        <div className="overflow-hidden pb-2">
          <h2 className="mask-text text-4xl font-light tracking-tight text-white md:text-6xl drop-shadow-md">
            que quebra a gravidade.
          </h2>
        </div>

        <div className="h-12 md:h-16"></div>

        {/* BLOCO 3 */}
        <div className="overflow-hidden pb-2">
          <h2 className="mask-text text-2xl font-light tracking-tight text-zinc-400 md:text-4xl">
            A FlyAI constrói ecossistemas de alta voltagem,
          </h2>
        </div>
        <div className="overflow-hidden pb-2">
          <h2 className="mask-text text-2xl font-light tracking-tight text-zinc-300 md:text-4xl">
            para a sua empresa <span className="font-medium text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">voar.</span>
          </h2>
        </div>

      </div>

    </section>
  );
}