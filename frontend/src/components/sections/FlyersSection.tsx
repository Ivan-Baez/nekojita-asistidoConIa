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
  {
    id: "toke-1",
    src: "/images/fotos/toke1.jpg",
    alt: "Foto de show de Nekojita",
    rotation: "-rotate-3",
  },
  {
    id: "toke-2",
    src: "/images/fotos/toke2.jpg",
    alt: "Foto de show de Nekojita",
    rotation: "rotate-1",
  },
];

export default function FlyersSection() {
  return (
    <section className="flex flex-col gap-8" aria-label="Flyers">
      <header>
        <h1 className="text-4xl font-black uppercase tracking-wider text-white md:text-6xl">
          Flyers
        </h1>
        <p className="mt-3 max-w-xl text-base text-neutral-400">
          Muro de afiches y fotos de los shows, pegados como en cualquier
          pared de ensayo.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {FLYERS.map((flyer) => (
          <div
            key={flyer.id}
            className={`relative aspect-[3/4] w-full border-2 border-neutral-800 transition-all duration-300 hover:rotate-0 hover:scale-105 ${flyer.rotation}`}
          >
            <Image
              src={flyer.src}
              alt={flyer.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
