"use client";

import Image from "next/image";

export const TABS = [
  { id: "inicio", label: "Inicio" },
  { id: "musica", label: "Música" },
  { id: "flyers", label: "Flyers" },
  { id: "contacto", label: "Contacto" },
  { id: "fechas", label: "Fechas" },
  { id: "muro", label: "Muro de Fans" },
  { id: "merch", label: "Merch" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

interface NavbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b-2 border-[#ff003c] bg-[#0a0a0a] shadow-[4px_4px_0px_0px_rgba(255,0,60,1)]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 md:h-20 md:px-6">
        <button
          type="button"
          onClick={() => onTabChange("inicio")}
          aria-label="Ir a Inicio"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/images/logos/logo1.png"
            alt="Nekojita"
            width={64}
            height={64}
            priority
            className="h-10 w-auto md:h-14"
          />
        </button>

        <nav
          role="tablist"
          aria-label="Secciones del sitio"
          className="-mr-4 flex min-w-0 flex-1 items-stretch gap-1 overflow-x-auto px-1 md:mr-0 md:justify-end md:gap-2"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={`relative whitespace-nowrap px-3 py-2 text-xs font-black uppercase tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff003c] md:px-4 md:text-sm ${
                  isActive
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {tab.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-1 bg-[#ff003c] transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
