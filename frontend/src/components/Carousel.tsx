"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchEvents, type CarouselEvent } from "@/services/api";

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function Carousel() {
  const [events, setEvents] = useState<CarouselEvent[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">(
    "loading",
  );

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

  return (
    <div
      id="carrusel-eventos"
      className="flex flex-col gap-4"
      aria-label="Carrusel de eventos"
    >
      <h2 className="text-xs font-black uppercase tracking-widest text-[#ff003c]">
        Próximos eventos
      </h2>

      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
        {events.map((event) => (
          <article
            key={event.id}
            className="w-full shrink-0 snap-start border-2 border-neutral-800 bg-neutral-900 shadow-[4px_4px_0px_0px_rgba(255,0,60,1)] sm:w-[420px]"
          >
            {event.imageUrl ? (
              <div className="relative aspect-video w-full border-b-2 border-neutral-800">
                <Image
                  src={event.imageUrl}
                  alt={event.eventName}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center border-b-2 border-neutral-800 bg-neutral-950">
                <span className="text-xs font-black uppercase tracking-widest text-neutral-600">
                  Sin afiche
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-[#ff003c]">
                {formatDate(event.eventDate)}
              </p>
              <h3 className="text-lg font-black uppercase tracking-wider text-white">
                {event.eventName}
              </h3>
              {event.message && (
                <p className="text-sm text-neutral-400">{event.message}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
