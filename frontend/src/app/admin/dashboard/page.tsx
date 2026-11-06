"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { fetchEvents, verifyTokenRequest, type CarouselEvent } from "@/services/api";
import { clearToken, getToken } from "@/services/token";

// Obtener la URL del Backend (NestJS) desde variables de entorno o fallback a puerto 3001/3000
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface EventForm {
  eventName: string;
  eventDate: string;
  message: string;
}

const EMPTY_FORM: EventForm = {
  eventName: "",
  eventDate: "",
  message: "",
};

// Función auxiliar para comprimir imágenes en el navegador
async function compressImage(file: File, maxWidth = 1920, quality = 0.85): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [form, setForm] = useState<EventForm>(EMPTY_FORM);

  // Múltiples archivos seleccionados y sus previsualizaciones
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  // URLs externas opcionales
  const [urlInput, setUrlInput] = useState("");
  const [urlList, setUrlList] = useState<string[]>([]);

  // Eventos existentes para administración
  const [existingEvents, setExistingEvents] = useState<CarouselEvent[]>([]);
  const [uploadingMoreForId, setUploadingMoreForId] = useState<string | null>(null);
  const [extraFiles, setExtraFiles] = useState<File[]>([]);

  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadEvents = () => {
    fetchEvents()
      .then((data) => setExistingEvents(data))
      .catch(() => {});
  };

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
      loadEvents();
    });
  }, [router]);

  const updateField = (field: keyof EventForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  // Selección múltiple con compresión automática
  const handleMultipleFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsCompressing(true);
    setErrorMessage(null);

    try {
      const compressedList = await Promise.all(
        files.map((file) => compressImage(file, 1920, 0.85))
      );

      setSelectedFiles((prev) => [...prev, ...compressedList]);

      const newPreviews = compressedList.map((file) => URL.createObjectURL(file));
      setFilePreviews((prev) => [...prev, ...newPreviews]);
    } catch (err) {
      console.error("Error al optimizar fotos:", err);
    } finally {
      setIsCompressing(false);
    }
  };

  // Eliminar una foto individual de la vista previa
  const handleRemoveSinglePhoto = (index: number) => {
    const previewToRemove = filePreviews[index];
    if (previewToRemove && previewToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(previewToRemove);
    }

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Vaciar toda la selección de fotos
  const handleClearAllPhotos = () => {
    filePreviews.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });
    setSelectedFiles([]);
    setFilePreviews([]);
    setUrlList([]);
  };

  // Agregar URL externa
  const handleAddUrl = () => {
    if (urlInput.trim()) {
      setUrlList((prev) => [...prev, urlInput.trim()]);
      setUrlInput("");
    }
  };

  const handleRemoveUrl = (index: number) => {
    setUrlList((prev) => prev.filter((_, i) => i !== index));
  };

  // Enviar el nuevo evento directamente al Backend NestJS
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
      const formData = new FormData();
      formData.append("eventName", form.eventName.trim());
      formData.append("eventDate", form.eventDate);
      if (form.message.trim()) formData.append("message", form.message.trim());

      // Adjuntar archivos comprimidos
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Adjuntar URLs adicionales si existen
      urlList.forEach((url) => formData.append("imageUrls", url));

      // Apuntar directamente a NestJS endpoint (evitando que Next.js interprete como Server Action)
      const targetUrl = `${API_BASE_URL.replace(/\/$/, "")}/events`;

      const res = await fetch(targetUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al subir las fotos del show al servidor.");
      }

      handleClearAllPhotos();
      setForm(EMPTY_FORM);
      setStatus("success");
      loadEvents();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error al publicar el evento."
      );
    }
  };

  // Agregar más fotos a un recital existente
  const handleAddMorePhotosToEvent = async (eventId: string) => {
    if (extraFiles.length === 0) return;
    const token = getToken();
    if (!token) return;

    try {
      const compressedExtra = await Promise.all(
        extraFiles.map((file) => compressImage(file, 1920, 0.85))
      );

      const formData = new FormData();
      compressedExtra.forEach((f) => formData.append("files", f));

      const targetUrl = `${API_BASE_URL.replace(/\/$/, "")}/events/${eventId}/photos`;

      const res = await fetch(targetUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al agregar fotos al recital.");

      setExtraFiles([]);
      setUploadingMoreForId(null);
      loadEvents();
    } catch (err: any) {
      alert(err.message || "Error al subir fotos adicionales.");
    }
  };

  // Eliminar un evento
  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("¿Seguro que querés eliminar este recital del carrusel?")) return;
    const token = getToken();
    if (!token) return;

    try {
      const targetUrl = `${API_BASE_URL.replace(/\/$/, "")}/events/${eventId}`;

      const res = await fetch(targetUrl, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al eliminar el evento.");
      loadEvents();
    } catch (err: any) {
      alert(err.message || "Error al eliminar.");
    }
  };

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
          Verificando acceso de la banda…
        </p>
      </main>
    );
  }

  const inputClasses =
    "w-full border-2 border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#ff003c]";

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">

        {/* Encabezado Privado */}
        <header className="flex items-center justify-between border-b-2 border-neutral-800 pb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logos/logo2transparente.png"
              alt="Nekojita"
              width={52}
              height={52}
              className="h-12 w-auto"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff003c]">
                Área Privada · Integrantes
              </p>
              <h1 className="text-xl font-black uppercase tracking-wider text-white md:text-3xl">
                Panel de Administración
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              clearToken();
              router.replace("/");
            }}
            className="border-2 border-neutral-700 px-4 py-2 text-xs font-black uppercase tracking-widest text-neutral-400 transition-colors hover:border-[#ff003c] hover:text-white"
          >
            Salir 🚪
          </button>
        </header>

        {/* FORMULARIO DE CREACIÓN */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 border-2 border-neutral-800 bg-neutral-900 p-6 shadow-[8px_8px_0px_0px_rgba(255,0,60,1)] sm:p-8"
        >
          <div className="border-b border-neutral-800 pb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff003c]">
              Paso 1
            </p>
            <h2 className="text-lg font-black uppercase tracking-wide text-white">
              ➕ Crear Recital y Cargar Galería de Fotos
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="event-name"
                className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
              >
                Nombre del Recital / Show *
              </label>
              <input
                id="event-name"
                type="text"
                required
                minLength={2}
                placeholder="Ej: Nekojita en vivo — 10 Botellas Fest"
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
                Fecha del Evento *
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
          </div>

          <div>
            <label
              htmlFor="event-message"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              Lugar / Descripción / Detalle <span className="text-neutral-600">(Opcional)</span>
            </label>
            <textarea
              id="event-message"
              rows={2}
              placeholder="Ej: Santiago de Chile | Entradas por IG"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={inputClasses}
            />
          </div>

          {/* SECCIÓN DE FOTOS MÚLTIPLES */}
          <div className="flex flex-col gap-4 border-t border-neutral-800 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-white">
                  📸 Seleccionar Fotos del Show
                </label>
                <p className="text-[11px] text-neutral-400">
                  Elegí múltiples fotos a la vez desde la galería de tu celular o PC.
                </p>
              </div>

              {filePreviews.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllPhotos}
                  className="border border-red-600 bg-red-950 px-3 py-1 text-[11px] font-bold text-red-300 hover:bg-red-600 hover:text-white"
                >
                  🗑️ Vaciar selección ({filePreviews.length})
                </button>
              )}
            </div>

            {/* Zona de Selección Múltiple */}
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-neutral-700 bg-neutral-950 p-6 text-center transition-colors hover:border-[#ff003c]">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultipleFilesChange}
                disabled={isCompressing}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <span className="text-3xl">{isCompressing ? "⚡" : "📷"}</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-neutral-200">
                {isCompressing
                  ? "⚡ Optimizando fotos al instante..."
                  : "Haz clic para elegir TODAS las fotos del show"}
              </p>
              <p className="mt-1 text-[10px] text-neutral-500">
                Soporta selección múltiple (JPG, PNG, WEBP)
              </p>
            </div>

            {/* VISTA PREVIA CON BORRADO INDIVIDUAL */}
            {filePreviews.length > 0 && (
              <div className="flex flex-col gap-2 border border-neutral-800 bg-neutral-950 p-4">
                <p className="text-xs font-black uppercase tracking-wider text-[#ff003c]">
                  Galería a publicar ({filePreviews.length} fotos seleccionadas):
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {filePreviews.map((url, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square w-full overflow-hidden border border-neutral-800 bg-black"
                    >
                      <img
                        src={url}
                        alt={`Foto ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveSinglePhoto(idx)}
                        title="Eliminar esta foto"
                        className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center bg-red-600 font-bold text-white shadow hover:bg-red-700"
                      >
                        ✕
                      </button>

                      <span className="absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-white">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* URL Externa adicional */}
            <div className="mt-2 flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                O agregar enlace por URL externa:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  className="border border-neutral-700 bg-neutral-800 px-4 text-xs font-bold uppercase text-white hover:border-[#ff003c]"
                >
                  Agregar
                </button>
              </div>

              {urlList.length > 0 && (
                <ul className="flex flex-col gap-1 pt-1">
                  {urlList.map((url, i) => (
                    <li key={i} className="flex items-center justify-between border border-neutral-800 bg-neutral-950 px-3 py-1 font-mono text-xs text-neutral-300">
                      <span className="truncate">{url}</span>
                      <button type="button" onClick={() => handleRemoveUrl(i)} className="text-red-500 hover:text-red-400 font-bold ml-2">
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {status === "success" && (
            <p className="text-sm font-bold text-green-400">
              ✔ Recital y galería publicados con éxito. Ya aparecen en el carrusel de la página principal.
            </p>
          )}

          {status === "error" && errorMessage && (
            <p className="text-sm font-bold text-[#ff003c]">⚠️ {errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "saving" || isCompressing}
            className="w-full border-2 border-[#ff003c] bg-[#ff003c] py-4 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ff003c] disabled:opacity-50 sm:w-fit sm:px-8"
          >
            {status === "saving" ? "Publicando Recital..." : "✔ Publicar Recital en el Carrusel"}
          </button>
        </form>

        {/* GESTIÓN DE EVENTOS EXISTENTES */}
        <div className="flex flex-col gap-4 border-2 border-neutral-800 bg-neutral-900 p-6 sm:p-8">
          <div className="border-b border-neutral-800 pb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff003c]">
              Paso 2
            </p>
            <h2 className="text-lg font-black uppercase tracking-wide text-white">
              ⚙️ Administrar Recitales Publicados
            </h2>
          </div>

          {existingEvents.length === 0 ? (
            <p className="py-4 text-xs font-mono text-neutral-500">
              No hay recitales registrados en el carrusel.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {existingEvents.map((ev) => {
                const images: string[] = (ev as any).imageUrls || (ev.imageUrl ? [ev.imageUrl] : []);

                return (
                  <div
                    key={ev.id}
                    className="flex flex-col gap-3 border border-neutral-800 bg-neutral-950 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {images.length > 0 ? (
                        <img
                          src={images[0]}
                          alt={ev.eventName}
                          className="h-16 w-16 border border-neutral-800 object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center border border-neutral-800 bg-neutral-900 text-[10px] text-neutral-600">
                          Sin foto
                        </div>
                      )}

                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#ff003c]">
                          {ev.eventDate}
                        </span>
                        <h3 className="text-base font-black uppercase text-white">
                          {ev.eventName}
                        </h3>
                        <p className="text-xs text-neutral-400">
                          📸 {images.length} foto(s) guardadas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {uploadingMoreForId === ev.id ? (
                        <div className="flex items-center gap-2 border border-neutral-800 bg-neutral-900 p-2">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setExtraFiles(Array.from(e.target.files || []))}
                            className="text-xs text-neutral-300"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddMorePhotosToEvent(ev.id)}
                            className="bg-[#ff003c] px-3 py-1 text-xs font-bold text-white"
                          >
                            Subir
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadingMoreForId(null)}
                            className="text-xs text-neutral-400"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setUploadingMoreForId(ev.id)}
                          className="border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-bold uppercase text-white hover:border-[#ff003c]"
                        >
                          📷 + Fotos
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="border border-red-900 bg-red-950 px-3 py-1.5 text-xs font-bold uppercase text-red-300 hover:bg-red-600 hover:text-white"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
