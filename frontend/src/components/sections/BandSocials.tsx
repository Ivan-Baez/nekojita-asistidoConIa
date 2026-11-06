"use client";

import FacebookLike from "./FacebookLike";

interface SocialItem {
  name: string;
  url: string;
  handle: string;
  description: string;
  icon: string;
  badge: string;
}

const SOCIAL_LINKS: SocialItem[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/nekojitapunk/",
    handle: "@nekojitapunk",
    description: "Fotos de los shows, backstages y novedades en vivo.",
    icon: "/images/logos/instagram.png",
    badge: "Fotos & Stories",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@NEKOJITAPUNK",
    handle: "Nekojita Punk",
    description: "Recitales completos, videoclips oficiales y ensayos.",
    icon: "/images/logos/network.png",
    badge: "Videos & En Vivo",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/6WgfFlAlGNqfBKKNdbRvSx",
    handle: "Nekojita",
    description: "Escuchá todos nuestros lanzamientos y temas.",
    icon: "/images/logos/logos--spotify-icon.png",
    badge: "Música & Singles",
  },
];

export default function BandSocials() {
  return (
    <section className="flex flex-col gap-8 border-2 border-neutral-800 bg-neutral-950 p-6 text-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
      <header className="border-b-2 border-red-600 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
          Comunidad & Plataformas
        </p>
        <h2 className="mt-1 text-3xl font-black uppercase tracking-tight md:text-4xl">
          Seguinos en <span className="text-red-600">Redes.</span>
        </h2>
      </header>

      {/* Rejilla de Redes Sociales (4 columnas) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Componente FacebookLike (tarjeta con icono /images/logos/facebook.png) */}
        <FacebookLike />

        {/* Tarjetas de Instagram, YouTube y Spotify */}
        {SOCIAL_LINKS.map((social) => (
          <div
            key={social.name}
            className="flex flex-col justify-between gap-4 border-l-2 border-neutral-700 bg-neutral-900 p-4 transition-all hover:border-red-600"
          >
            <div>
              <div className="flex items-center justify-between">
                {social.icon.startsWith("/") || social.icon.startsWith("data:") ? (
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="h-7 w-7 object-contain"
                  />
                ) : (
                  <span className="text-2xl">{social.icon}</span>
                )}
                <span className="border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  {social.badge}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-black uppercase tracking-wider text-white">
                {social.name}
              </h3>

              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                {social.description}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono text-neutral-500">
                {social.handle}
              </span>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit border border-neutral-700 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-500 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                Abrir {social.name} ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
