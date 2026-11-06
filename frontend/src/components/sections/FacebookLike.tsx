"use client";

export default function FacebookLike() {
  return (
    <div className="flex flex-col justify-between gap-4 border-l-2 border-red-600 bg-neutral-900 p-4 transition-all hover:border-red-500">
      <div>
        <div className="flex items-center justify-between">
          <img
            src="/images/logos/facebook.png"
            alt="Facebook"
            className="h-7 w-7 object-contain"
          />
          <span className="border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Comunidad & Likes
          </span>
        </div>

        <h3 className="mt-3 text-sm font-black uppercase tracking-wider text-white">
          Facebook
        </h3>

        <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
          Noticias, recitales y novedades de la banda.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-mono text-neutral-500">
          NekojitaPunk
        </span>
        <a
          href="https://www.facebook.com/NekojitaPunk"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit border border-neutral-700 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-500 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          Visitar página ↗
        </a>
      </div>
    </div>
  );
}
