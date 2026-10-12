import type { ComponentType } from "react";
import type { TabId } from "./Navbar";
import ContactSection from "./sections/ContactSection";
import FlyersSection from "./sections/FlyersSection";
import HeroSection from "./sections/HeroSection";
import MerchSection from "./sections/MerchSection";
import MusicSection from "./sections/MusicSection";

interface TabContainerProps {
  activeTab: TabId;
}

interface SectionEntry {
  title: string;
  Component?: ComponentType;
}

const SECTIONS: Record<TabId, SectionEntry> = {
  inicio: { title: "Inicio", Component: HeroSection },
  musica: { title: "Música", Component: MusicSection },
  flyers: { title: "Flyers", Component: FlyersSection },
  contacto: { title: "Contacto", Component: ContactSection },
  fechas: { title: "Fechas" },
  muro: { title: "Muro de Fans" },
  merch: { title: "Merch", Component: MerchSection },
};

export default function TabContainer({ activeTab }: TabContainerProps) {
  const { title, Component } = SECTIONS[activeTab];

  return (
    <section
      aria-label={title}
      className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col justify-center px-4 py-10 md:px-6 md:py-14"
    >
      {Component ? (
        <Component />
      ) : (
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-black uppercase tracking-wider text-white md:text-6xl">
            {title}
          </h1>
          <span className="border-2 border-[#ff003c] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#ff003c] shadow-[4px_4px_0px_0px_rgba(255,0,60,1)]">
            Próximamente
          </span>
        </div>
      )}
    </section>
  );
}
