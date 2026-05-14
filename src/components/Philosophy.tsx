"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".philo-text",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative flex w-full flex-col items-center justify-center bg-black py-40 px-6 text-center">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
        
        {/* Ícone Minimalista (Um diamante/core) */}
        <div className="philo-text mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <div className="h-2 w-2 rotate-45 bg-white shadow-[0_0_10px_white]"></div>
        </div>

        <h2 className="philo-text text-3xl font-light leading-relaxed text-zinc-300 md:text-5xl md:leading-tight">
          &ldquo;A verdadeira inteligência artificial não substitui o ser humano. <br className="hidden md:block" />
          <span className="font-medium text-white">Ela o liberta.&rdquo;</span>
        </h2>

        <p className="philo-text mt-6 text-lg font-light text-zinc-500">
          Construímos infraestruturas invisíveis para que você possa focar no que é insubstituível: <span className="font-medium text-zinc-400">a visão do seu negócio.</span>
        </p>

      </div>
    </section>
  );
}