import { beforeEach, describe, expect, it } from "vitest";
import { clearToken, getToken, setToken } from "@/services/token";

describe("token service", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("devuelve null cuando no hay token guardado", () => {
    expect(getToken()).toBeNull();
  });

  it("guarda y recupera el token", () => {
    setToken("jwt-de-prueba");

    expect(getToken()).toBe("jwt-de-prueba");
    expect(window.localStorage.getItem("nekojita_token")).toBe("jwt-de-prueba");
  });

  it("borra el token al hacer logout", () => {
    setToken("jwt-de-prueba");
    clearToken();

    expect(getToken()).toBeNull();
  });
});
