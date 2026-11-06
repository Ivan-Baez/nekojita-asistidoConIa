"use client";

import { useEffect, useState } from "react";
import { fetchEvents, type CarouselEvent } from "@/services/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return isoDate;
  }
}

// Convertir cualquier ruta (relativa o absoluta) en una URL completa y directa al Backend
function getImageUrl(src: string): string {
  if (!src) return "";
  const trimmed = src.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${API_BASE_URL.replace(/\/$/, "")}${cleanPath}`;
}

// Extraer TODAS las fotos sin importar cómo las devolvió el servidor
function extractAllImages(event: any): string[] {
  const imagesSet = new Set<string>();

  if (Array.isArray(event.imageUrls)) {
    event.imageUrls.forEach((img: any) => {
      if (typeof img === "string" && img.trim()) imagesSet.add(img.trim());
    });
  } else if (typeof event.imageUrls === "string" && event.imageUrls.trim()) {
    try {
      const parsed = JSON.parse(event.imageUrls);
      if (Array.isArray(parsed)) {
        parsed.forEach((img: any) => {
          if (typeof img === "string" && img.trim()) imagesSet.add(img.trim());
        });
      }
    } catch {
      event.imageUrls.split(",").forEach((s: string) => {
        if (s.trim()) imagesSet.add(s.trim());
      });
    }
  }

  if (typeof event.imageUrl === "string" && event.imageUrl.trim()) {
    const raw = event.imageUrl.trim();
    if (raw.startsWith("[") && raw.endsWith("]")) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((img: any) => {
            if (typeof img === "string" && img.trim()) imagesSet.add(img.trim());
          });
        }
      } catch {
        imagesSet.add(raw);
      }
    } else if (raw.includes(",")) {
      raw.split(",").forEach((s) => {
        if (s.trim()) imagesSet.add(s.trim());
      });
    } else {
      imagesSet.add(raw);
    }
  }

  return Array.from(imagesSet);
}

export default function Carousel() {
  const [events, setEvents] = useState<CarouselEvent[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">(
    "loading"
  );

  // Guardar el índice de la foto activa para cada recital
  const [activePhotoIndex, setActivePhotoIndex] = useState<{
    [eventId: string]: number;
  }>({});

  // Control de errores de carga por URL de imagen
  const [failedImages, setFailedImages] = useState<{ [url: string]: boolean }>({});

  // Estado para el visor / lightbox a pantalla completa
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
  });

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setStatus(data.length > 0 ? "ready" : "empty");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <div className="border-2 border-dashed border-neutral-800 px-6 py-10 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
          Cargando eventos…
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="border-2 border-dashed border-neutral-800 px-6 py-10 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
          No se pudieron cargar los eventos
        </p>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="border-2 border-dashed border-neutral-800 px-6 py-10 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
          Próximamente: nuevos recitales
        </p>
      </div>
    );
  }

  // ORDENAR EVENTOS VERTICALMENTE: El más reciente / último creado SIEMPRE ARRIBA
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.eventDate).getTime();
    const dateB = new Date(b.eventDate).getTime();
    if (!isNaN(dateA) && !isNaN(dateB) && dateA !== dateB) {
      return dateB - dateA; // Descendente: Fecha más nueva primero
    }
    return String(b.id || "").localeCompare(String(a.id || ""));
  });

  return (
    <div
      id="carrusel-eventos"
      className="flex flex-col gap-6"
      aria-label="Galería vertical de recitales"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h2 className="text-xs font-black uppercase tracking-widest text-[#ff003c]">
          Galerías de Recitales (Orden Cronológico Reversivo)
        </h2>
        <span className="text-[10px] font-mono text-neutral-500">
          {sortedEvents.length} álbum(es) publicado(s)
        </span>
      </div>

      {/* DISPOSICIÓN VERTICAL DE CADA RECITAL / ÁLBUM DE FOTOS */}
      <div className="flex flex-col gap-10">
        {sortedEvents.map((event, eventIdx) => {
          const images = extractAllImages(event);
          const currentIndex = activePhotoIndex[event.id] || 0;
          const activeImage = images.length > 0 ? images[currentIndex] || images[0] : null;
          const fullImageUrl = activeImage ? getImageUrl(activeImage) : null;
          const isImageFailed = fullImageUrl ? failedImages[fullImageUrl] : false;

          const handlePrevPhoto = (e: React.MouseEvent) => {
            e.stopPropagation();
            setActivePhotoIndex((prev) => ({
              ...prev,
              [event.id]: currentIndex > 0 ? currentIndex - 1 : images.length - 1,
            }));
          };

          const handleNextPhoto = (e: React.MouseEvent) => {
            e.stopPropagation();
            setActivePhotoIndex((prev) => ({
              ...prev,
              [event.id]: currentIndex < images.length - 1 ? currentIndex + 1 : 0,
            }));
          };

          const openLightboxAt = (index: number) => {
            setLightbox({
              isOpen: true,
              images,
              currentIndex: index,
              title: event.eventName,
            });
          };

          return (
            <article
              key={event.id}
              className="w-full border-2 border-neutral-800 bg-neutral-900 p-5 sm:p-7 shadow-[6px_6px_0px_0px_rgba(255,0,60,1)] flex flex-col gap-5 transition-all"
            >
              {/* ENCABEZADO DEL RECITAL */}
              <div className="flex flex-col gap-2 border-b border-neutral-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="border border-[#ff003c] bg-[#ff003c]/10 px-2.5 py-0.5 text-xs font-black uppercase tracking-widest text-[#ff003c]">
                      📅 {formatDate(event.eventDate)}
                    </span>
                    {eventIdx === 0 && (
                      <span className="bg-[#ff003c] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white animate-pulse">
                        🔥 Último recital cargado
                      </span>
                    )}
                  </div>

                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => openLightboxAt(currentIndex)}
                      className="border border-neutral-700 bg-neutral-950 px-3 py-1 text-xs font-bold text-neutral-300 hover:border-[#ff003c] hover:text-white transition-colors"
                    >
                      📸 Ver álbum completo ({images.length} fotos)
                    </button>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                  {event.eventName}
                </h3>

                {event.message && (
                  <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                    {event.message}
                  </p>
                )}
              </div>

              {/* ÁREA VISUAL PRINCIPAL DE FOTOS DE ESTE RECITAL */}
              <div>
                {activeImage && !isImageFailed ? (
                  <div className="flex flex-col gap-3">
                    {/* VISOR DESTACADO DE LA FOTO ACTIVA */}
                    <div className="group relative aspect-video w-full overflow-hidden border-2 border-neutral-800 bg-black cursor-pointer shadow-lg">
                      <img
                        src={fullImageUrl!}
                        alt={event.eventName}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onClick={() => openLightboxAt(currentIndex)}
                        onError={() => {
                          if (fullImageUrl) {
                            setFailedImages((prev) => ({ ...prev, [fullImageUrl]: true }));
                          }
                        }}
                      />

                      {/* Flechas de navegación directa */}
                      {images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={handlePrevPhoto}
                            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-black/80 font-bold text-white border border-neutral-700 hover:border-[#ff003c] hover:bg-[#ff003c] transition-colors z-10"
                            title="Foto anterior"
                          >
                            ❮
                          </button>
                          <button
                            type="button"
                            onClick={handleNextPhoto}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-black/80 font-bold text-white border border-neutral-700 hover:border-[#ff003c] hover:bg-[#ff003c] transition-colors z-10"
                            title="Siguiente foto"
                          >
                            ❯
                          </button>

                          {/* Indicador de número de foto */}
                          <span className="absolute bottom-3 right-3 bg-black/90 border border-neutral-700 px-3 py-1 text-xs font-mono text-white font-bold">
                            Foto {currentIndex + 1} de {images.length}
                          </span>
                        </>
                      )}
                    </div>

                    {/* TIRA DE MINIATURAS INTERACTIVAS DEL ÁLBUM */}
                    {images.length > 1 && (
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 pt-1">
                        {images.map((imgUrl: string, idx: number) => {
                          const isSelected = currentIndex === idx;
                          const thumbFullUrl = getImageUrl(imgUrl);

                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() =>
                                setActivePhotoIndex((prev) => ({
                                  ...prev,
                                  [event.id]: idx,
                                }))
                              }
                              className={`relative aspect-square w-full overflow-hidden border-2 transition-all ${
                                isSelected
                                  ? "border-[#ff003c] ring-2 ring-[#ff003c] scale-105 z-10 opacity-100"
                                  : "border-neutral-800 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={thumbFullUrl}
                                alt={`${event.eventName} - Miniatura ${idx + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-neutral-800 bg-neutral-950 p-6 text-center">
                    <span className="text-4xl">📷</span>
                    <span className="text-xs font-black uppercase tracking-widest text-neutral-500">
                      Imagen no disponible
                    </span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* MODAL LIGHTBOX A PANTALLA COMPLETA PARA VER TODAS LAS FOTOS */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col gap-4 border-2 border-neutral-800 bg-neutral-900 p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Encabezado del visor */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                  {lightbox.title}
                </h3>
                <p className="text-xs text-[#ff003c] font-mono">
                  Foto {lightbox.currentIndex + 1} de {lightbox.images.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
                className="flex h-8 w-8 items-center justify-center border border-neutral-700 bg-neutral-800 text-sm font-bold text-white hover:bg-[#ff003c] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Imagen Ampliada en Modal */}
            <div className="relative aspect-video w-full overflow-hidden border border-neutral-800 bg-black flex items-center justify-center">
              {lightbox.images[lightbox.currentIndex] ? (
                <img
                  src={getImageUrl(lightbox.images[lightbox.currentIndex])}
                  alt="Foto ampliada"
                  className="max-h-full max-w-full object-contain"
                />
              ) : null}

              {lightbox.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox((prev) => ({
                        ...prev,
                        currentIndex:
                          prev.currentIndex > 0
                            ? prev.currentIndex - 1
                            : prev.images.length - 1,
                      }))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-black/80 text-lg font-bold text-white border border-neutral-700 hover:bg-[#ff003c] transition-colors"
                  >
                    ❮
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox((prev) => ({
                        ...prev,
                        currentIndex:
                          prev.currentIndex < prev.images.length - 1
                            ? prev.currentIndex + 1
                            : 0,
                      }))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-black/80 text-lg font-bold text-white border border-neutral-700 hover:bg-[#ff003c] transition-colors"
                  >
                    ❯
                  </button>
                </>
              )}
            </div>

            {/* Tira inferior de miniaturas en el modal */}
            {lightbox.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pt-2">
                {lightbox.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setLightbox((prev) => ({ ...prev, currentIndex: idx }))
                    }
                    className={`relative h-16 w-16 shrink-0 overflow-hidden border ${
                      lightbox.currentIndex === idx
                        ? "border-[#ff003c] ring-2 ring-[#ff003c]"
                        : "border-neutral-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={getImageUrl(imgUrl)}
                      alt={`Miniatura ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
