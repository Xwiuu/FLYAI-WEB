import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useGsapRefresh() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ScrollTrigger || typeof ScrollTrigger.refresh !== "function") return;

    let t: number | undefined;
    const handler = () => {
      if (t) clearTimeout(t);
      t = window.setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch {
          // noop
        }
      }, 150);
    };

    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);
    handler();

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
      if (t) clearTimeout(t);
    };
  }, []);
}
