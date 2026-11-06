"use client";

import { useState, type FormEvent } from "react";
import { validateContactForm } from "@/lib/contactValidation";

const CONTACT_EMAIL = "contacto@nekojita.com";
const CONTACT_PHONE = "+54 9 261 556-3749";
const FACEBOOK_PAGE_URL = "https://www.facebook.com/NekojitaPunk";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<
    ReturnType<typeof validateContactForm>
  >({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(name, email, message);
    setErrors(nextErrors);
    setSent(false);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const subject = encodeURIComponent(`Contacto web — ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}`,
    );

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setSent(true);
  };

  const inputClasses =
    "w-full border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600";

  return (
    <section
      className="flex flex-col gap-10 text-white"
      aria-label="Contacto"
    >
      {/* Encabezado */}
      <header className="border-b-2 border-red-600 pb-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
          Hablemos de música
        </p>

        <h1 className="text-5xl font-black uppercase leading-none tracking-tighter sm:text-6xl md:text-7xl">
          Contacto<span className="text-red-600">.</span>
        </h1>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
            ¿Organizás un recital? ¿Querés colaborar con la banda?
            <br />
            <span className="font-bold text-neutral-200">
              Escribinos. El ruido nos conecta.
            </span>
          </p>

          <span className="w-fit border border-neutral-700 px-3 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
            Nekojita · Mendoza
          </span>
        </div>
      </header>

      {/* Formulario y datos de contacto */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-6 border border-neutral-800 bg-neutral-900 p-5 sm:p-8"
        >
          <div className="mb-1 border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-black uppercase tracking-wide">
              Mandanos un mensaje
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Completá los campos y prepará tu mensaje.
            </p>
          </div>

          {/* Nombre */}
          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-xs font-black uppercase tracking-widest text-neutral-300"
            >
              Nombre <span className="text-red-600">*</span>
            </label>

            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="¿Cómo te llamás?"
              className={inputClasses}
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />

            {errors.name && (
              <p
                id="contact-name-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-500"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-xs font-black uppercase tracking-widest text-neutral-300"
            >
              Email <span className="text-red-600">*</span>
            </label>

            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              className={inputClasses}
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />

            {errors.email && (
              <p
                id="contact-email-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-500"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Mensaje */}
          <div>
            <label
              htmlFor="contact-message"
              className="mb-2 block text-xs font-black uppercase tracking-widest text-neutral-300"
            >
              Mensaje <span className="text-red-600">*</span>
            </label>

            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Contanos qué tenés en mente..."
              className={`${inputClasses} resize-y`}
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
            />

            {errors.message && (
              <p
                id="contact-message-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-500"
              >
                {errors.message}
              </p>
            )}
          </div>

          {/* Envío */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 border-2 border-red-600 bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-transparent hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:w-fit"
          >
            Enviar mensaje
            <span aria-hidden="true">↗</span>
          </button>

          {sent && (
            <p
              role="status"
              className="border-l-2 border-red-600 bg-neutral-950 p-3 text-sm leading-relaxed text-neutral-300"
            >
              Se abrió tu cliente de correo con el mensaje preparado.
              Revisalo y enviá el email para completar el contacto.
            </p>
          )}

          <p className="text-xs leading-relaxed text-neutral-600">
            Los campos marcados con * son obligatorios. El mensaje se prepara
            en tu aplicación de correo.
          </p>
        </form>

        {/* Información de contacto */}
        <aside className="flex flex-col border border-neutral-800 bg-neutral-900">
          <div className="border-b border-neutral-800 p-5 sm:p-6">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-red-500">
              01 // Directo
            </p>

            <h2 className="text-lg font-black uppercase">Hablemos</h2>

            <a
              href={`tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`}
              className="mt-3 block text-sm text-neutral-300 transition-colors hover:text-red-500"
            >
              {CONTACT_PHONE}
            </a>

            <p className="mt-1 text-sm text-neutral-500">
              Nicolás Flores
            </p>
          </div>

          <div className="border-b border-neutral-800 p-5 sm:p-6">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-red-500">
              02 // Redes
            </p>

            <h2 className="text-lg font-black uppercase">Seguinos</h2>

            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-neutral-300 underline decoration-red-600 underline-offset-4 transition-colors hover:text-red-500"
            >
              Facebook / Nekojita
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-red-500">
              03 // Prensa
            </p>

            <h2 className="text-lg font-black uppercase">
              Material de prensa
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Próximamente estará disponible nuestra gacetilla para medios y
              organizadores.
            </p>

            <button
              type="button"
              disabled
              title="El PDF de la gacetilla todavía no está disponible"
              className="mt-5 w-full border border-neutral-700 px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-500 disabled:cursor-not-allowed sm:mt-auto"
            >
              Gacetilla PDF · Próximamente
            </button>
          </div>

          <div className="border-t-2 border-red-600 bg-neutral-950 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
              Punk rock independiente
            </p>
            <p className="mt-2 text-sm font-bold text-white">
              Mendoza, Argentina.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}