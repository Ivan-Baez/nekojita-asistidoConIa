import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TabContainer from "@/components/TabContainer";

vi.mock("@/components/Carousel", () => ({
  default: () => <div data-testid="carousel-mock" />,
}));

vi.mock("@/components/sections/FacebookLike", () => ({
  default: () => <div data-testid="facebook-like-mock" />,
}));

describe("TabContainer", () => {
  it("renderiza la sección de Inicio con el video y el carrusel", () => {
    render(<TabContainer activeTab="inicio" />);

    expect(
      screen.getByTitle("Nekojita en vivo — Santiago de Chile"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("carousel-mock")).toBeInTheDocument();
    expect(screen.getByTestId("facebook-like-mock")).toBeInTheDocument();
  });

  it("renderiza la sección de Música con los singles", () => {
    render(<TabContainer activeTab="musica" />);

    expect(screen.getByRole("heading", { name: /Música/ })).toBeInTheDocument();
    expect(screen.getByText("El pacto")).toBeInTheDocument();
  });

  it("renderiza la sección de Flyers con los afiches", () => {
    render(<TabContainer activeTab="flyers" />);

    expect(screen.getByRole("heading", { name: /Flyers/ })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(6);
  });

  it("renderiza la sección de Contacto con el formulario", () => {
    render(<TabContainer activeTab="contacto" />);

    expect(
      screen.getByRole("heading", { name: /Contacto/ }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nombre/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Mensaje/)).toBeInTheDocument();
  });

  it("renderiza la sección de Fechas con el calendario embebido", () => {
    render(<TabContainer activeTab="fechas" />);

    expect(screen.getByRole("heading", { name: /Fechas/ })).toBeInTheDocument();
    expect(
      screen.getByTitle("Calendario de fechas de Nekojita"),
    ).toBeInTheDocument();
  });

  it("renderiza la sección de Muro de Fans con el formulario embebido", () => {
    render(<TabContainer activeTab="muro" />);

    expect(
      screen.getByRole("heading", { name: /Muro de Fans/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByTitle("Formulario del Muro de Fans de Nekojita"),
    ).toBeInTheDocument();
  });

  it("renderiza la sección de Merch con los productos", () => {
    render(<TabContainer activeTab="merch" />);

    expect(screen.getByRole("heading", { name: /Merch/ })).toBeInTheDocument();
    expect(screen.getByText("Remera Nekojita")).toBeInTheDocument();
  });
});
