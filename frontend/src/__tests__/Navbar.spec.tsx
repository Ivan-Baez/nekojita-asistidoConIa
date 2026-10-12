import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Navbar, { TABS } from "@/components/Navbar";

describe("Navbar", () => {
  it("renderiza las 7 pestañas de la banda", () => {
    render(<Navbar activeTab="inicio" onTabChange={() => undefined} />);

    for (const tab of TABS) {
      expect(screen.getByRole("tab", { name: tab.label })).toBeInTheDocument();
    }

    expect(screen.getAllByRole("tab")).toHaveLength(7);
  });

  it("marca como activa solo la pestaña seleccionada", () => {
    render(<Navbar activeTab="musica" onTabChange={() => undefined} />);

    expect(screen.getByRole("tab", { name: "Música" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Inicio" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("notifica el cambio de pestaña al hacer click", () => {
    const onTabChange = vi.fn();

    render(<Navbar activeTab="inicio" onTabChange={onTabChange} />);

    fireEvent.click(screen.getByRole("tab", { name: "Merch" }));

    expect(onTabChange).toHaveBeenCalledWith("merch");
    expect(onTabChange).toHaveBeenCalledTimes(1);
  });

  it("vuelve a Inicio al hacer click en el logo", () => {
    const onTabChange = vi.fn();

    render(<Navbar activeTab="flyers" onTabChange={onTabChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Ir a Inicio" }));

    expect(onTabChange).toHaveBeenCalledWith("inicio");
  });
});
