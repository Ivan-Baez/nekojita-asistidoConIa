import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Carousel from "@/components/Carousel";

const EVENTS = [
  {
    id: "event-1",
    eventName: "Primer toke en Santiago",
    eventDate: "2026-11-23T00:00:00.000Z",
    message: "Subterraneo Records",
    imageUrl: null,
    createdById: "user-1",
    createdAt: "2026-10-08T00:00:00.000Z",
  },
  {
    id: "event-2",
    eventName: "Rottem Bar",
    eventDate: "2026-12-16T00:00:00.000Z",
    message: null,
    imageUrl: null,
    createdById: "user-1",
    createdAt: "2026-10-08T00:00:00.000Z",
  },
];

function mockFetch(impl: () => Promise<Response>) {
  vi.stubGlobal("fetch", vi.fn(impl));
}

describe("Carousel", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("muestra el estado de carga mientras consulta la API", () => {
    mockFetch(() => new Promise(() => undefined));

    render(<Carousel />);

    expect(screen.getByText("Cargando eventos…")).toBeInTheDocument();
  });

  it("renderiza las tarjetas de los eventos recibidos", async () => {
    mockFetch(async () =>
      Response.json(EVENTS, { status: 200 }),
    );

    render(<Carousel />);

    expect(
      await screen.findByText("Primer toke en Santiago"),
    ).toBeInTheDocument();
    expect(screen.getByText("Rottem Bar")).toBeInTheDocument();
    expect(screen.getByText("Subterraneo Records")).toBeInTheDocument();
    expect(screen.getByText("23 de noviembre de 2026")).toBeInTheDocument();
  });

  it("muestra el estado vacío cuando no hay eventos", async () => {
    mockFetch(async () => Response.json([], { status: 200 }));

    render(<Carousel />);

    expect(
      await screen.findByText("Próximamente: nuevos recitales"),
    ).toBeInTheDocument();
  });

  it("muestra un mensaje de error si la API falla", async () => {
    mockFetch(async () => Response.json({}, { status: 500 }));

    render(<Carousel />);

    expect(
      await screen.findByText("No se pudieron cargar los eventos"),
    ).toBeInTheDocument();
  });
});
