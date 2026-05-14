export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-black pt-24 pb-8 px-6 md:pt-32">
      
      {/* Linha de separação do CTA/Filosofia para o Footer */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16">
        
        {/* Topo do Footer: Links e Contato */}
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-0">
          
          {/* Coluna 1: Marca e Contato */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span className="text-xl font-medium tracking-widest text-white">FlyAI</span>
            </div>
            <p className="max-w-xs text-sm font-light leading-relaxed text-zinc-500">
              Arquitetura de Inteligência Artificial e Ecossistemas Autônomos para operações de alto nível.
            </p>
            <a href="mailto:contato@flyai.com.br" className="text-sm font-medium text-white transition-colors hover:text-zinc-400">
              contato@flyai.com.br
            </a>
          </div>

          {/* Colunas de Links */}
          <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-24">
            
            <div className="flex flex-col gap-4">
              <span className="text-xs font-medium tracking-widest text-zinc-600">ECOSSISTEMA</span>
              <a href="#systems" className="text-sm font-light text-zinc-400 hover:text-white">Infraestrutura</a>
              <a href="#systems" className="text-sm font-light text-zinc-400 hover:text-white">Agentes Autônomos</a>
              <a href="#systems" className="text-sm font-light text-zinc-400 hover:text-white">Cyber & Governança</a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-medium tracking-widest text-zinc-600">EMPRESA</span>
              <a href="#process" className="text-sm font-light text-zinc-400 hover:text-white">Protocolo</a>
              <a href="#cases" className="text-sm font-light text-zinc-400 hover:text-white">Cases & Dados</a>
              <a href="#" className="text-sm font-light text-zinc-400 hover:text-white">Carreiras</a>
            </div>

            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <span className="text-xs font-medium tracking-widest text-zinc-600">SOCIAL</span>
              <a href="#" className="text-sm font-light text-zinc-400 hover:text-white">LinkedIn</a>
              <a href="#" className="text-sm font-light text-zinc-400 hover:text-white">Instagram</a>
              <a href="#" className="text-sm font-light text-zinc-400 hover:text-white">GitHub</a>
            </div>

          </div>
        </div>

        {/* Rodapé do Footer: Copy e Logo Gigante */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs font-light text-zinc-600">
            &copy; {new Date().getFullYear()} FlyAI Systems. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-light text-zinc-600 hover:text-zinc-400">Termos de Uso</a>
            <a href="#" className="text-xs font-light text-zinc-600 hover:text-zinc-400">Privacidade</a>
          </div>
        </div>

      </div>

      {/* FLY AI GIGANTE NO FUNDO (O charme final) */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 w-full -translate-x-1/2 translate-y-1/3 text-center">
        <h1 className="text-[15vw] font-bold tracking-tighter text-white/[0.02] md:text-[12vw]">
          FlyAI
        </h1>
      </div>

    </footer>
  );
}