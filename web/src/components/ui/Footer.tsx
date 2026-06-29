import Image from "next/image";
import { brand } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-surface-muted border-t border-line-subtle">
      <div className="container-x py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 items-start">
          <div>
            <div className="mb-5">
              <Image 
                src="/logo-coluna-conectada-site.png" 
                alt={brand.name} 
                width={240} 
                height={79} 
                className="w-48 sm:w-56 h-auto"
              />
            </div>
            <p className="text-ink-secondary text-sm max-w-md">
              {brand.pillars}
            </p>
          </div>

          <div className="sm:text-right text-sm text-ink-tertiary">
            <p>© {new Date().getFullYear()} Coluna Conectada</p>
            <p className="mt-1">Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
