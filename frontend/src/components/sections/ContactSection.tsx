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
  const [errors, setErrors] = useState<ReturnType<typeof validateContactForm>>(
    {},
  );
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

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputClasses =
    "w-full border-2 border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#ff003c]";

  return (
    <section className="flex flex-col gap-8" aria-label="Contacto">
      <header>
        <h1 className="text-4xl font-black uppercase tracking-wider text-white md:text-6xl">
          Contacto
        </h1>
        <p className="mt-3 max-w-xl text-base text-neutral-400">
          Para recitales, colaboraciones y prensa.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 border-2 border-neutral-800 bg-neutral-900 p-6"
        >
          <div>
            <label
              htmlFor="contact-name"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              Nombre
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClasses}
              aria-invalid={errors.name ? "true" : undefined}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-[#ff003c]">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClasses}
              aria-invalid={errors.email ? "true" : undefined}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-[#ff003c]">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              Mensaje
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={inputClasses}
              aria-invalid={errors.message ? "true" : undefined}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-[#ff003c]">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-fit border-2 border-[#ff003c] bg-[#ff003c] px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ff003c]"
          >
            Enviar mensaje
          </button>

          {sent && (
            <p className="text-sm text-neutral-300">
              Se abrió tu cliente de correo con el mensaje listo para enviar.
            </p>
          )}
        </form>

        <aside className="flex flex-col gap-6 border-2 border-neutral-800 bg-neutral-900 p-6">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500">
              Directo
            </h2>
            <p className="mt-2 text-sm text-neutral-300">{CONTACT_PHONE}</p>
            <p className="text-sm text-neutral-300">Nicolás Flores</p>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500">
              Redes
            </h2>
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-white underline decoration-[#ff003c] underline-offset-4 hover:text-[#ff003c]"
            >
              facebook.com/NekojitaPunk
            </a>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500">
              Prensa
            </h2>
            <button
              type="button"
              disabled
              title="El PDF de la gacetilla todavía no está disponible"
              className="mt-2 border-2 border-neutral-700 px-4 py-2 text-xs font-black uppercase tracking-widest text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Gacetilla de prensa (PDF) — próximamente
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
