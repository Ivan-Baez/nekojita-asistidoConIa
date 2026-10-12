"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { loginRequest } from "@/services/api";
import { getToken, setToken } from "@/services/token";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginRequest(email.trim(), password);
      setToken(response.accessToken);
      router.replace("/admin/dashboard");
    } catch {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full border-2 border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#ff003c]";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md border-2 border-neutral-800 bg-neutral-900 p-8 shadow-[4px_4px_0px_0px_rgba(255,0,60,1)]">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Image
            src="/images/logos/logo2transparente.png"
            alt="Nekojita"
            width={80}
            height={80}
            priority
            className="h-20 w-auto"
          />
          <h1 className="text-2xl font-black uppercase tracking-wider text-white">
            Acceso de la banda
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-1 block text-xs font-black uppercase tracking-widest text-neutral-400"
            >
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClasses}
              required
            />
          </div>

          {error && <p className="text-sm text-[#ff003c]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 border-2 border-[#ff003c] bg-[#ff003c] px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-transparent hover:text-[#ff003c] disabled:opacity-50"
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}
