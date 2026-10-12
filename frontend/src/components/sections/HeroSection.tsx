import Carousel from "../Carousel";
import FacebookLike from "./FacebookLike";

const YOUTUBE_VIDEO_ID = "pe_sbPeM19w";

export default function HeroSection() {
  return (
    <section className="flex flex-col gap-8" aria-label="Inicio">
      <div className="relative aspect-video w-full overflow-hidden border-2 border-neutral-800 shadow-[4px_4px_0px_0px_rgba(255,0,60,1)]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
          title="Nekojita en vivo — Santiago de Chile"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-wider text-white md:text-6xl">
            Nekojita
          </h1>
          <p className="mt-3 max-w-xl text-base text-neutral-400 md:text-lg">
            Banda punk rock de Mendoza, Argentina. Autenticidad y resistencia
            desde 2024.
          </p>
        </div>
        <FacebookLike />
      </div>

      <Carousel />
    </section>
  );
}
