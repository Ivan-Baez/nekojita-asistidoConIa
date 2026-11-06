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
    <header className="fixed left-0 top-0 z-50 w-full border-b-2 border-red-600 bg-neutral-950 shadow-[0_4px_0px_rgba(220,38,38,0.15)]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:h-[72px] md:px-6">

        {/* Logo */}
        <button
          type="button"
          onClick={() => onTabChange("inicio")}
          aria-label="Ir a Inicio"
          className="group flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        >
          <Image
            src="/images/logos/transparentelogo1.png"
            alt="Nekojita"
            width={200}
            height={200}
            priority
            className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105 sm:h-14 md:h-16"
          />
        </button>

        {/* Navegación */}
        <nav
          role="tablist"
          aria-label="Secciones del sitio"
          className="flex min-w-0 flex-1 items-stretch justify-start gap-1 overflow-x-auto px-1 sm:justify-end sm:gap-2"
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
                className={`relative flex shrink-0 items-center whitespace-nowrap px-3 py-2 text-[11px] font-black uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:px-3 sm:text-xs md:px-4 md:text-sm ${
                  isActive
                    ? "text-white"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                {tab.label}

                {/* Indicador de sección activa */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-[3px] bg-red-600 transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />

                {/* Fondo de la sección activa */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-red-600/10"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}