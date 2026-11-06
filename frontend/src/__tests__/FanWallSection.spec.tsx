import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FanWallSection from "@/components/sections/FanWallSection";

const MESSAGES = [
  {
    id: 1,
    author: "Nico",
    message: "¡Que sea rock! Tremendo el show en Mendoza",
    createdAt: "2026-10-24T00:00:00.000Z",
  },
  {
    id: 2,
    author: "Agus_punk",
    message: "Aguante Nekojitaaaa",
    createdAt: "2026-10-23T00:00:00.000Z",
  },
];

const NEW_MESSAGE = {
  id: 3,
  author: "Juan_Punk",
  message: "Nos vemos en el próximo show",
  createdAt: "2026-10-24T01:00:00.000Z",
};

type FetchImpl = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

function mockFetch(impl: FetchImpl) {
  vi.stubGlobal("fetch", vi.fn(impl));
}

describe("FanWallSection", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("muestra el estado de carga mientras consulta la API", () => {
    mockFetch(() => new Promise(() => undefined));

    render(<FanWallSection />);

    expect(screen.getByText("Cargando mensajes…")).toBeInTheDocument();
  });

  it("renderiza los mensajes recibidos de la API", async () => {
    mockFetch(async () => Response.json(MESSAGES, { status: 200 }));

    render(<FanWallSection />);

    expect(
      await screen.findByText('"¡Que sea rock! Tremendo el show en Mendoza"'),
    ).toBeInTheDocument();
    expect(screen.getByText("— Nico")).toBeInTheDocument();
    expect(screen.getByText('"Aguante Nekojitaaaa"')).toBeInTheDocument();
    expect(screen.getByText("— Agus_punk")).toBeInTheDocument();
  });

  it("muestra un mensaje de error si la API falla", async () => {
    mockFetch(async () => Response.json({}, { status: 500 }));

    render(<FanWallSection />);

    expect(
      await screen.findByText("No se pudieron cargar los mensajes"),
    ).toBeInTheDocument();
  });

  it("permite pegar un mensaje nuevo en el muro", async () => {
    const user = userEvent.setup();
    mockFetch(async (_input, init) => {
      if (init?.method === "POST") {
        return Response.json(NEW_MESSAGE, { status: 201 });
      }
      return Response.json([], { status: 200 });
    });

    render(<FanWallSection />);

    await waitFor(() =>
      expect(screen.queryByText("Cargando mensajes…")).not.toBeInTheDocument(),
    );

    await user.click(
      screen.getByTitle("Formulario del Muro de Fans de Nekojita"),
    );
    await user.type(screen.getByPlaceholderText("Ej: Juan_Punk"), "Juan_Punk");
    await user.type(
      screen.getByPlaceholderText("Escribe tu saludo o recuerdo aquí..."),
      "Nos vemos en el próximo show",
    );
    await user.click(
      screen.getByRole("button", { name: "¡Pegar en la pared! 📌" }),
    );

    expect(
      await screen.findByText('"Nos vemos en el próximo show"'),
    ).toBeInTheDocument();
    expect(screen.getByText("— Juan_Punk")).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/fan-wall"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          author: "Juan_Punk",
          message: "Nos vemos en el próximo show",
        }),
      }),
    );

    expect(
      screen.queryByText("Pegar mensaje en el muro"),
    ).not.toBeInTheDocument();
  });
});
