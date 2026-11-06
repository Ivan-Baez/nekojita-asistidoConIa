"use client";

import { useState } from "react";
import Image from "next/image";

interface Single {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  available: boolean;
  audioUrl?: string; // Ruta al archivo MP3 en public/audio/
  spotifyUrl?: string; // Enlace a Spotify (opcional)
  lyrics?: string; // Letra de la canción
}

const SINGLES: Single[] = [
  {
    id: "el-pacto",
    title: "El pacto",
    subtitle: "Primer sencillo ",
    cover: "/images/portadas/Gemini_el-pacto.jpg",
    available: true, // Cambiar a true cuando esté listo
    audioUrl: "/audio/el-pacto-nekojita.mp3",
    spotifyUrl: "https://open.spotify.com/intl-es/track/1AaBQguRArcwvIYgcTaOH9",
    lyrics: `(Letra en proceso de grabación)\n\nNekojita - El Pacto\nMendoza, Argentina`,
  },
  {
    id: "mascleta",
    title: "Mascleta",
    subtitle: "Segundo sencillo",
    cover: "/images/portadas/Gemini_mascleta.jpg",
    available: true,
    audioUrl: "/audio/mascleta-nekojita.mpeg.mp3",
    spotifyUrl: "https://open.spotify.com/intl-es/track/4dFaXYWUolZlqvoKaBSOgB",
    lyrics: `(Letra en proceso de grabación)`,
  },
  {
    id: "ya-no-creo",
    title: "Ya no creo",
    subtitle: "Tercer sencillo",
    cover: "/images/portadas/Gemini_ya-no-creo.jpg",
    available: true,
    audioUrl: "/audio/ya-no-creo-nekojita.mp3",
    spotifyUrl: "https://open.spotify.com/intl-es/track/7z7el9O4U3Op4JKo0B2RsD",
    lyrics: `(Letra en proceso de grabación)`,
  },
];

function CassetteButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="w-full border border-neutral-700 bg-neutral-950 px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-neutral-400 transition-colors duration-200 hover:border-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="mr-3 text-red-600">{"///"}</span>
      {label}
      {disabled && (
        <span className="float-right text-[10px] tracking-normal text-neutral-600">
          PRONTO
        </span>
      )}
    </button>
  );
}

export default function MusicSection() {
  const [activeLyrics, setActiveLyrics] = useState<{ title: string; lyrics: string } | null>(null);

  return (
    <section className="flex flex-col gap-10 text-white" aria-label="Música">
      {/* Encabezado */}
      <header className="border-b-2 border-red-600 pb-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
          El sonido de la banda
        </p>

        <h1 className="text-5xl font-black uppercase leading-none tracking-tighter sm:text-6xl md:text-7xl">
          Música<span className="text-red-600">.</span>
        </h1>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Cassettes, singles y letras de la banda.
            <br />
            <span className="font-bold text-neutral-200">
              Música independiente, sin filtros.
            </span>
          </p>

          <span className="w-fit border border-neutral-700 px-3 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
            Mendoza, Argentina
          </span>
        </div>
      </header>

      {/* Catálogo */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {SINGLES.map((single, index) => (
          <article
            key={single.id}
            className="group flex flex-col border border-neutral-800 bg-neutral-900 p-4 transition-colors duration-300 hover:border-red-600"
          >
            {/* Número de lanzamiento */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
                Lanzamiento // 0{index + 1}
              </span>
              <span className="h-2 w-2 bg-red-600" />
            </div>

{/* Portada */}
            <div className="relative aspect-square overflow-hidden border border-neutral-700 bg-black">
              <Image
                src={single.cover}
                alt={`Portada de ${single.title}`}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="object-contain bg-neutral-950 transition-transform duration-500 group-hover:scale-105"
              />

              {!single.available && (
                <div className="absolute bottom-0 left-0 bg-red-600 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                  En preparación
                </div>
              )}
            </div>

            {/* Información */}
            <div className="flex flex-1 flex-col">
              <div className="mt-5 border-l-4 border-red-600 pl-3">
                <h2 className="text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
                  {single.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                  {single.subtitle}
                </p>
              </div>

              {/* Detalle inspirado en un cassette */}
              <div
                className="my-5 flex items-center gap-3 border-y border-neutral-800 py-3"
                aria-hidden="true"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-neutral-600 bg-neutral-800">
                  <span className="h-2 w-2 rounded-full bg-neutral-500" />
                </span>
                <span className="h-1 flex-1 bg-neutral-700">
                  <span className="block h-full w-1/3 bg-red-600" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-neutral-600 bg-neutral-800">
                  <span className="h-2 w-2 rounded-full bg-neutral-500" />
                </span>
              </div>

              {/* Reproductor de MP3 integrado en la tarjeta */}
              <div className="mb-4">
                {single.available && single.audioUrl ? (
                  <div className="border border-neutral-700 bg-black p-2">
                    <audio controls className="w-h-8 w-full accent-red-600">
                      <source src={single.audioUrl} type="audio/mpeg" />
                      Tu navegador no soporta el reproductor de audio.
                    </audio>
                  </div>
                ) : (
                  <div className="border border-dashed border-neutral-800 bg-black/40 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    Audio no disponible aún
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="mt-auto flex flex-col gap-2">
                {single.spotifyUrl && (
                  <CassetteButton
                    label="Escuchar en Spotify"
                    disabled={false}
                    onClick={() => window.open(single.spotifyUrl, "_blank")}
                  />
                )}

                <CassetteButton
                  label="Ver letras"
                  disabled={!single.lyrics}
                  onClick={() =>
                    single.lyrics &&
                    setActiveLyrics({ title: single.title, lyrics: single.lyrics })
                  }
                />

                <CassetteButton
                  label="Descargar cassette"
                  disabled={!single.available || !single.audioUrl}
                  onClick={() => {
                    if (single.audioUrl) {
                      const link = document.createElement("a");
                      link.href = single.audioUrl;
                      link.download = `${single.title}-Nekojita.mp3`;
                      link.click();
                    }
                  }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal de Letras */}
      {activeLyrics && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg border-2 border-red-600 bg-neutral-950 p-6 text-white shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <h3 className="text-xl font-black uppercase text-red-500">
                Letra // {activeLyrics.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveLyrics(null)}
                className="text-xs font-bold uppercase bg-red-600 px-2 py-1 text-white hover:bg-red-700"
              >
                Cerrar [X]
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm text-neutral-300 leading-relaxed max-h-96 overflow-y-auto pr-2">
              {activeLyrics.lyrics}
            </pre>
          </div>
        </div>
      )}

      {/* Pie de sección */}
      <footer className="border-t border-neutral-800 pt-5">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-neutral-600">
          Nekojita · Punk rock independiente
        </p>
      </footer>
    </section>
  );
}