import Carousel from "../Carousel";
import BandSocials from "./BandSocials";

const YOUTUBE_VIDEO_ID = "uFXEsj1Mn9M";

export default function HeroSection() {
  return (
    <section
      className="flex flex-col gap-12 bg-neutral-950 text-white"
      aria-label="Inicio"
    >
      {/* Encabezado de la banda con el logo transparente exacto del usuario */}
      <header className="relative overflow-hidden border-b-2 border-red-600 pb-8 pt-6">
        <div className="absolute right-0 top-0 select-none text-8xl font-black uppercase tracking-tighter text-neutral-900 md:text-9xl">
          NKJ
        </div>

        <div className="relative z-10">
          <p className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.4em] text-red-500">
            <span className="h-1 w-8 bg-red-600" />
            Mendoza · Argentina · Punk Rock
          </p>

          <h1 className="flex items-center justify-center text-6xl font-black uppercase leading-none tracking-tighter sm:text-7xl md:text-9xl">
            <img 
              src="/images/logos/transparentelogo1.png" 
              alt="NEKOJITA" 
              className="h-40 sm:h-60 md:h-80 lg:h-[400px] w-auto object-contain inline-block max-w-full transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] cursor-pointer"
            />
          </h1>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl border-l-4 border-red-600 pl-4 text-lg leading-relaxed text-neutral-300 md:text-xl">
              Autenticidad, ruido y resistencia.
              <br />
              <span className="font-bold text-white">
                Punk rock desde 2024.
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Sección Gacetilla de Prensa // Dossier Oficial con biografía a ancho completo */}
      <div className="border-2 border-neutral-800 bg-neutral-900 p-6 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] sm:p-10">
        <header className="mb-8 flex flex-col gap-4 border-b-2 border-red-600 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              Gacetilla de Prensa // Dossier Oficial
            </p>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-tight md:text-5xl">
              Biografía <span className="text-red-600">& Trayectoria.</span>
            </h2>
          </div>
          {/* Logo superior de la gacetilla */}
          <img
            src="/images/logos/logo2transparente.png"
            alt="Nekojita Punks Logo"
            className="h-20 w-auto object-contain self-start sm:self-auto"
          />
        </header>

        {/* Biografía y Trayectoria a ancho completo */}
        <div className="flex flex-col gap-8">
          
          {/* Grid superior: Párrafos de biografía + Foto en vivo a la derecha */}
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
            
            {/* Textos biográficos principales */}
            <div className="flex flex-col gap-5 text-base leading-relaxed text-neutral-200 md:col-span-7 md:text-lg">
              <p>
                Desde Mendoza, <strong className="text-white font-bold">Nekojita</strong> irrumpe en la escena con una propuesta que combina la crudeza del punk y una identidad marcada por la autogestión y la energía en vivo.
              </p>
              <p>
                Formada en 2024, la formación original estuvo integrada por <strong className="text-white font-bold">Nicolás Flores</strong> (voz y guitarra), <strong className="text-white font-bold">Nicolás Castro</strong> (guitarra), <strong className="text-white font-bold">Nicolás Lucero</strong> (bajo y voz) y <strong className="text-white font-bold">José Benglini</strong> (batería). Actualmente, la banda está conformada por Nicolás Flores, Nicolás Castro, Nicolás Lucero y <strong className="text-white font-bold">Enzo Altamirano</strong> (batería), aportando un enfoque más potente y técnico.
              </p>
              <p>
                Su sonido nace del contraste: melodías intensas que conviven con pasajes explosivos, letras cargadas de emoción y una impronta directa que conecta con lo cotidiano, lo social y lo personal.
              </p>

              {/* Explicación del término japonés Nekojita */}
              <div className="my-2 border-l-4 border-red-600 bg-neutral-950 p-5">
                <p className="mb-2 text-sm font-black uppercase text-red-500 tracking-wider">
                  ¿Qué significa "Nekojita"? (猫舌)
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
                  En japonés hace referencia a las personas que no pueden tolerar comidas o bebidas muy calientes. La banda toma esta metáfora para <strong className="text-white font-bold">escupir aquello que quema, duele o resulta insoportable.</strong>
                </p>
              </div>
            </div>

            {/* FOTO EN VIVO DE LA BANDA */}
            <div className="flex flex-col gap-3 md:col-span-5">
              <div className="relative overflow-hidden border-2 border-neutral-700 bg-black shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
                <img
                  src="/images/fotos/nekoji-HERO.jpg"
                  alt="Nekojita show en vivo"
                  className="h-auto w-full min-h-[280px] sm:min-h-[360px] object-cover"
                />
              </div>
              <span className="text-center font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
                Nekojita en vivo sobre el escenario
              </span>
            </div>
          </div>

          {/* Párrafos sobre trayectoria, festival en Chile y shows */}
          <div className="flex flex-col gap-5 border-t-2 border-neutral-800 pt-6 text-base leading-relaxed text-neutral-200 md:text-lg">
            <p>
              En noviembre de 2025, la banda dio un paso importante al presentarse en Santiago de Chile en el <strong className="text-white font-bold">10 Botellas Fest</strong>, un festival organizado por la banda 10 Botellas, referente de la escena chilena desde 1994, marcando así su primera experiencia internacional.
            </p>
            <p>
              En poco tiempo, Nekojita ha realizado <strong className="text-white font-bold">12 presentaciones en vivo</strong> —incluyendo la fecha internacional—, consolidando una propuesta que apuesta por la cercanía, la intensidad y la construcción de comunidad en cada show.
            </p>
            <p>
              Actualmente, la banda se encuentra trabajando en nuevo material y afianzando su presencia en la escena local y regional.
            </p>
          </div>

          {/* LOGO CIRCULAR DEL GATO */}
          <div className="flex justify-end pt-2">
            <img
              src="/images/logos/logo2transparente.png"
              alt="Emblema Nekojita Gato"
              className="h-32 w-auto object-contain opacity-95 transition-transform hover:scale-105 sm:h-40"
            />
          </div>

        </div>
      </div>

      {/* Video principal */}
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-base font-black uppercase tracking-[0.25em] text-white sm:text-lg">
            En vivo <span className="text-red-600">{"//"}</span>
          </h2>

          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Santiago de Chile
          </span>
        </div>

        <div className="relative aspect-video w-full overflow-hidden border border-neutral-700 bg-black shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
            title="Nekojita en vivo — Santiago de Chile"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>

      {/* Carrusel de eventos */}
      <div className="border-t border-neutral-800 pt-8">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            Archivo visual
          </p>

          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
            La banda <span className="text-red-600">en imágenes.</span>
          </h2>
        </div>

        <Carousel />
      </div>

      {/* Redes Sociales al final de la portada */}
      <div className="border-t border-neutral-800 pt-8">
        <BandSocials />
      </div>
    </section>
  );
}
