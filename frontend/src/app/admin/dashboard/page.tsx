"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createEventRequest, verifyTokenRequest } from "@/services/api";
import { clearToken, getToken } from "@/services/token";

interface EventForm {
  eventName: string;
  eventDate: string;
  message: string;
  imageUrl: string;
}

const EMPTY_FORM: EventForm = {
  eventName: "",
  eventDate: "",
  message: "",
  imageUrl: "",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [form, setForm] = useState<EventForm>(EMPTY_FORM);
  const [status, setStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/");
      return;
    }

    verifyTokenRequest(token).then((valid) => {
      if (!valid) {
        clearToken();
        router.replace("/");
        return;
      }

      setAuthorized(true);
    });
  }, [router]);

  const updateField = (field: keyof EventForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = getToken();

    if (!token) {
      router.replace("/");
      return;
    }

    setStatus("saving");
    setErrorMessage(null);

    try {
      await createEventRequest(token, {
        eventName: form.eventName.trim(),
        eventDate: form.eventDate,
        message: form.message.trim() || undefined,
        imageUrl: form.imageUrl.trim() || undefined,
      });

      setForm(EMPTY_FORM);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error desconocido",
      );
    }
  };

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
          Verificando acceso…
        </p>
      </main>
    );
  }

  const inputClasses =
    "w-full border-2 border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#ff003c]";

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logos/logo2transparente.png"
              alt="Nekojita"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <h1 className="text-xl font-black uppercase tracking-wider text-white md:text-3xl">
              Panel de la banda
            </h1>
          </div>
          <button
            type="button"
            onClick={() => {
              clearToken();
              router.replace("/");
            }}
            className="border-2 border-neutral-700 px-4 py-2 text-xs font-black uppercase tracking-widest text-neutral-400 transition-colors hover:border-[#ff003c] hover:text-white"
          >
            Salir
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 border-2 border-neutral-800 bg-neutral-900 p-6"
        >
          <h2 className="text-xs font-black uppercase tracking-widest text-[#ff003c]">
            Publicar evento en el carrusel
          </h2>

          <div>
            <label
              htmlFor="event-name"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              Nombre del evento
            </label>
            <input
              id="event-name"
              type="text"
              required
              minLength={2}
              value={form.eventName}
              onChange={(event) => updateField("eventName", event.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="event-date"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              Fecha del evento
            </label>
            <input
              id="event-date"
              type="date"
              required
              value={form.eventDate}
              onChange={(event) => updateField("eventDate", event.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="event-message"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              Mensaje / subtítulo
            </label>
            <textarea
              id="event-message"
              rows={3}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="event-image"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              URL del afiche o foto
            </label>
            <input
              id="event-image"
              type="url"
              placeholder="https://…"
              value={form.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
              className={inputClasses}
            />
          </div>

          {status === "success" && (
            <p className="text-sm text-green-400">
              Evento publicado. Ya aparece en el carrusel de la Home.
            </p>
          )}

          {status === "error" && errorMessage && (
            <p className="text-sm text-[#ff003c]">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "saving"}
            className="w-fit border-2 border-[#ff003c] bg-[#ff003c] px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ff003c] disabled:opacity-50"
          >
            {status === "saving" ? "Publicando…" : "Publicar evento"}
          </button>
        </form>
      </div>
    </main>
  );
}
