"use client";

import { useEffect, useState } from "react";
import {
  createFanWallMessageRequest,
  fetchFanWallMessages,
  type FanWallMessage,
} from "@/services/api";

interface StickerMessage {
  id: number;
  author: string;
  message: string;
  x: number; // Porcentaje horizontal (0 a 100)
  y: number; // Porcentaje vertical (0 a 100)
  rotation: number; // Ángulo de inclinación (-6 a 6)
  color: string;
}

const STICKER_COLORS = [
  "bg-[#ff003c] text-white",
  "bg-yellow-400 text-black",
  "bg-white text-black",
  "bg-black text-white border-white",
];

// Hash determinístico por id para que cada mensaje conserve siempre
// la misma posición, rotación y color entre recargas.
function hash(id: number, salt: number): number {
  let h = (Math.imul(id, 374761393) + Math.imul(salt, 668265263)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return (h ^ (h >>> 16)) >>> 0;
}

function toSticker(message: FanWallMessage): StickerMessage {
  return {
    id: message.id,
    author: message.author,
    message: message.message,
    x: 12 + (hash(message.id, 1) % 77),
    y: 12 + (hash(message.id, 2) % 77),
    rotation: (hash(message.id, 3) % 13) - 6,
    color: STICKER_COLORS[hash(message.id, 4) % STICKER_COLORS.length],
  };
}

export default function FanWallSection() {
  const [stickers, setStickers] = useState<StickerMessage[]>([]);
  const [colorOverrides, setColorOverrides] = useState<Record<number, string>>(
    {},
  );
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  // Estados del modal emergente
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-[#ff003c] text-white");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetchFanWallMessages()
      .then((data) => {
        setStickers(data.map(toSticker));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  // Clic en el lienzo: abre el modal para pegar un mensaje
  const handleCanvasClick = () => {
    setSaveError(null);
    setIsModalOpen(true);
  };

  // Guarda el nuevo sticker en el muro a través de la API
  const handleSaveSticker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !author.trim() || isSaving) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const saved = await createFanWallMessageRequest({
        author: author.trim(),
        message: message.trim(),
      });

      setStickers((prev) => [toSticker(saved), ...prev]);
      setColorOverrides((prev) => ({ ...prev, [saved.id]: selectedColor }));
      setIsModalOpen(false);
      setAuthor("");
      setMessage("");
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "No se pudo pegar el mensaje en la pared",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="flex flex-col gap-10 text-white" aria-label="Muro de Fans">
      <header className="border-b-2 border-red-600 pb-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
          Comunidad
        </p>

        <h1 className="text-5xl font-black uppercase leading-none tracking-tighter sm:text-6xl md:text-7xl">
          Muro de Fans<span className="text-red-600">.</span>
        </h1>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Haz clic en cualquier lugar de la pared para pegar tu mensaje.
            <br />
            <span className="font-bold text-neutral-200">
              Deja tu marca en el muro de Nekojita.
            </span>
          </p>

          <span className="w-fit border border-neutral-700 px-3 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
            Nekojita · Mendoza
          </span>
        </div>
      </header>

      {/* LIENZO DONDE SE PEGAN LOS STICKERS */}
      <div
        onClick={handleCanvasClick}
        title="Formulario del Muro de Fans de Nekojita"
        className="relative h-[560px] w-full cursor-crosshair overflow-hidden border-2 border-neutral-800 bg-neutral-950 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] md:h-[720px]"
        style={{
          backgroundImage: "url('images/logos/logo2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <div className="absolute top-4 left-4 z-10 rounded border border-neutral-700 bg-black/80 px-3 py-1.5 font-mono text-xs text-neutral-300">
          💡 Haz clic en la pared para pegar un mensaje
        </div>

        {status === "loading" && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <p className="border border-neutral-700 bg-black/80 px-4 py-2 text-xs font-black uppercase tracking-widest text-neutral-400">
              Cargando mensajes…
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
            <p className="border border-red-700 bg-black/80 px-4 py-2 text-xs font-black uppercase tracking-widest text-red-500">
              No se pudieron cargar los mensajes
            </p>
          </div>
        )}

        {/* STICKERS PEGADOS */}
        {stickers.map((s) => (
          <div
            key={s.id}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
            }}
            className={`absolute z-20 max-w-[200px] border-2 border-black p-3 font-sans shadow-lg transition-transform hover:z-30 hover:scale-110 ${colorOverrides[s.id] ?? s.color}`}
          >
            <p className="text-xs font-bold leading-tight break-words">
              &quot;{s.message}&quot;
            </p>
            <span className="mt-2 block text-right text-[10px] font-black uppercase tracking-wider opacity-80">
              — {s.author}
            </span>
          </div>
        ))}
      </div>

      {/* MODAL EMERGENTE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md border-2 border-red-600 bg-neutral-900 p-6 shadow-[8px_6px_0px_0px_rgba(220,38,38,1)]">
            <h2 className="text-xl font-black uppercase text-white">
              Pegar mensaje en el muro
            </h2>
            <p className="mb-4 text-xs text-neutral-400">
              Escribe tu apodo y tu frase para la pared.
            </p>

            <form onSubmit={handleSaveSticker} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-neutral-300">
                  Tu Nombre / Apodo
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ej: Juan_Punk"
                  className="w-full border border-neutral-700 bg-neutral-800 p-2 text-sm text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-neutral-300">
                  Mensaje
                </label>
                <textarea
                  required
                  maxLength={280}
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu saludo o recuerdo aquí..."
                  className="w-full border border-neutral-700 bg-neutral-800 p-2 text-sm text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-neutral-300">
                  Color del Sticker
                </label>
                <div className="flex gap-2">
                  {[
                    { label: "Rojo", class: "bg-[#ff003c] text-white" },
                    { label: "Amarillo", class: "bg-yellow-400 text-black" },
                    { label: "Blanco", class: "bg-white text-black" },
                    { label: "Negro", class: "bg-black text-white border-white" },
                  ].map((color) => (
                    <button
                      key={color.label}
                      type="button"
                      aria-label={color.label}
                      onClick={() => setSelectedColor(color.class)}
                      className={`h-8 w-8 rounded border-2 ${color.class} ${
                        selectedColor === color.class
                          ? "ring-2 ring-red-500 ring-offset-2 ring-offset-neutral-900"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              {saveError && (
                <p className="text-xs font-bold text-red-500" role="alert">
                  {saveError}
                </p>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-neutral-700 px-4 py-2 text-xs font-bold uppercase text-neutral-400 hover:bg-neutral-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-red-600 px-5 py-2 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "Pegando…" : "¡Pegar en la pared! 📌"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
