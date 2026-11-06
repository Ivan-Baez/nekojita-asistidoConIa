import Image from "next/image";

interface Flyer {
  id: string;
  src: string;
  alt: string;
  rotation: string;
}

const FLYERS: Flyer[] = [
    {
    id: "afiche-1",
    src: "/images/afiches/flayer-27-06-2026.jpg",
    alt: "Afiche al seko de recital de Nekojita",
    rotation: "-rotate-2",
  },
      {
    id: "afiche-2",
    src: "/images/afiches/flayer-16-5-2026.jpg",
    alt: "Afiche los diabolos,nxn de recital de Nekojita",
    rotation: "-rotate-2",
  },
        {
    id: "afiche-3",
    src: "/images/afiches/flayer-7-5-2026.jpg",
    alt: "Subterraneo record de recital de Nekojita",
    rotation: "-rotate-2",
  },
          {
    id: "afiche-4",
    src: "/images/afiches/flayer-14-3-2026.jpg",
    alt: "Recital solidario",
    rotation: "-rotate-2",
  },
          {
    id: "afiche-5",
    src: "/images/afiches/flayer-8-11-2025.jpg",
    alt: "recital casita  anarquista",
    rotation: "-rotate-2",
  },
            {
    id: "afiche-6",
    src: "/images/afiches/flayer-27-9-2025.jpg",
    alt: "Rotem bar",
    rotation: "-rotate-2",
  },
              {
    id: "afiche-7",
    src: "/images/afiches/flayer-19-9-2025.jpg",
    alt: "recital casita  anarquista",
    rotation: "-rotate-2",
  },
  {
    id: "afiche-1",
    src: "/images/afiches/afiche1.jpg",
    alt: "Afiche de recital de Nekojita",
    rotation: "-rotate-2",
  },
  {
    id: "afiche-2",
    src: "/images/afiches/afiche2.jpg",
    alt: "Afiche de recital de Nekojita",
    rotation: "rotate-3",
  },
  {
    id: "afiche-3",
    src: "/images/afiches/afiche3.jpg",
    alt: "Afiche de recital de Nekojita",
    rotation: "-rotate-1",
  },
  {
    id: "afiche-4",
    src: "/images/afiches/afiche4.jpg",
    alt: "Afiche de recital de Nekojita",
    rotation: "rotate-2",
  },
];

export default function FlyersSection() {
  return (
    <section
      className="flex flex-col gap-10 text-white"
      aria-label="Flyers"
    >
      {/* Encabezado */}
      <header className="border-b-2 border-red-600 pb-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
          Recitales · Calle · Ruido
        </p>

        <h1 className="text-5xl font-black uppercase leading-none tracking-tighter sm:text-6xl md:text-7xl">
          Flyers<span className="text-red-600">!</span>
        </h1>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Un muro de afiches y recuerdos de nuestros shows.
            <br />
            <span className="font-bold text-neutral-200">
              Cada fecha deja su marca.
            </span>
          </p>

          <span className="w-fit border border-neutral-700 px-3 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
            Archivo visual · Nekojita
          </span>
        </div>
      </header>

      {/* Muro de imágenes */}
      <div className="relative border border-neutral-800 bg-neutral-900 p-4 sm:p-6 md:p-8">
        {/* Identificación del muro */}
        <div className="mb-8 flex items-center justify-between border-b border-neutral-700 pb-4">
          <h2 className="text-sm font-black uppercase tracking-[0.2em]">
            Pegados en la pared
          </h2>

          <span className="text-xs font-bold text-red-500">
            NKJ // 001
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FLYERS.map((flyer, index) => (
            <figure
              key={flyer.id}
              className={`group relative mx-auto w-full max-w-sm ${flyer.rotation} transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.03]`}
            >
              {/* Cinta adhesiva decorativa */}
              <div
                aria-hidden="true"
                className="absolute -top-3 left-1/2 z-10 h-7 w-16 -translate-x-1/2 rotate-[-4deg] border-x border-neutral-500/30 bg-neutral-300/80"
              />

              {/* Marco de papel */}
              <div className="border border-neutral-700 bg-neutral-100 p-2 pb-4 shadow-[4px_6px_0px_rgba(0,0,0,0.45)] sm:p-3 sm:pb-5">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800">
                  <Image
                    src={flyer.src}
                    alt={flyer.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Pie del afiche */}
                <figcaption className="flex items-center justify-between gap-2 pt-3 text-neutral-900">
                  <span className="text-xs font-black uppercase tracking-widest">
                    Nekojita
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                    Archivo {String(index + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        {/* Cierre del muro */}
        <div className="mt-12 border-t border-neutral-700 pt-5">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
            Mendoza, Argentina · Punk rock independiente
          </p>
        </div>
      </div>
    </section>
  );
}