const CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?src=4470a08bb952af35738dbb83f4da2daf28dccf94eb10525af91226f52752cb64%40group.calendar.google.com&ctz=America%2FArgentina%2FMendoza";

export default function DatesSection() {
  return (
    <section className="flex flex-col gap-10 text-white" aria-label="Fechas">
      <header className="border-b-2 border-red-600 pb-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
          Próximos shows
        </p>

        <h1 className="text-5xl font-black uppercase leading-none tracking-tighter sm:text-6xl md:text-7xl">
          Fechas<span className="text-red-600">.</span>
        </h1>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Todas las fechas de recitales y eventos.
            <br />
            <span className="font-bold text-neutral-200">
              Sumate al mosh.
            </span>
          </p>

          <span className="w-fit border border-neutral-700 px-3 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
            Nekojita · Mendoza
          </span>
        </div>
      </header>

      <div className="overflow-hidden border border-neutral-800 bg-neutral-900">
        <iframe
          src={CALENDAR_EMBED_URL}
          title="Calendario de fechas de Nekojita"
          className="h-[500px] w-full border-0 sm:h-[560px] md:h-[640px]"
          loading="lazy"
          scrolling="no"
        />
      </div>
    </section>
  );
}
