import Image from "next/image";

interface Single {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  available: boolean;
}

const SINGLES: Single[] = [
  {
    id: "el-pacto",
    title: "El pacto",
    subtitle: "Sencillo en grabación",
    cover: "/images/portadas/portada1.png",
    available: false,
  },
  {
    id: "single-2",
    title: "Próximamente",
    subtitle: "Segundo sencillo — título por confirmar",
    cover: "/images/portadas/portadaCOLOR.png",
    available: false,
  },
  {
    id: "single-3",
    title: "Próximamente",
    subtitle: "Tercer sencillo — título por confirmar",
    cover: "/images/portadas/portadaBN.png",
    available: false,
  },
];

function CassetteButton({
  label,
  disabled,
}: {
  label: string;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="flex-1 border-2 border-neutral-700 bg-neutral-900 px-3 py-2 text-[11px] font-black uppercase tracking-wider text-neutral-300 transition-colors hover:border-[#ff003c] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-700 disabled:hover:text-neutral-300"
    >
      {label}
    </button>
  );
}

export default function MusicSection() {
  return (
    <section className="flex flex-col gap-8" aria-label="Música">
      <header>
        <h1 className="text-4xl font-black uppercase tracking-wider text-white md:text-6xl">
          Música
        </h1>
        <p className="mt-3 max-w-xl text-base text-neutral-400">
          Cassettes, singles y letras de la banda.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {SINGLES.map((single) => (
          <article
            key={single.id}
            className="border-2 border-neutral-800 bg-neutral-900 p-4 shadow-[4px_4px_0px_0px_rgba(255,0,60,1)]"
          >
            <div className="relative aspect-square w-full overflow-hidden border-2 border-neutral-700">
              <Image
                src={single.cover}
                alt={`Portada de ${single.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="mt-4 bg-white px-3 py-2">
              <p className="text-sm font-black uppercase tracking-wider text-neutral-900">
                {single.title}
              </p>
              <p className="text-xs text-neutral-600">{single.subtitle}</p>
            </div>

            <div className="mt-3 flex items-center justify-center gap-6 py-3">
              <span className="h-8 w-8 rounded-full border-4 border-neutral-600 bg-neutral-800" />
              <span className="h-2 flex-1 bg-neutral-700" />
              <span className="h-8 w-8 rounded-full border-4 border-neutral-600 bg-neutral-800" />
            </div>

            <div className="flex flex-col gap-2">
              <CassetteButton label="Escuchar Single" disabled />
              <CassetteButton label="Ver Letras" disabled />
              <CassetteButton label="Descargar Cassette" disabled />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
