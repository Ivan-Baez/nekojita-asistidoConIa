import { describe, expect, it } from "vitest";
import { validateContactForm } from "@/lib/contactValidation";

describe("validateContactForm", () => {
  it("no devuelve errores con datos válidos", () => {
    const errors = validateContactForm(
      "Nicolás",
      "fan@correo.com",
      "Quiero contratar un recital en Mendoza.",
    );

    expect(errors).toEqual({});
  });

  it("exige un nombre de al menos 2 caracteres", () => {
    expect(validateContactForm("A", "fan@correo.com", "Mensaje suficiente").name).toMatch(
      /nombre/i,
    );
    expect(validateContactForm("  ", "fan@correo.com", "Mensaje suficiente").name).toBeTruthy();
  });

  it("rechaza emails mal formados", () => {
    expect(validateContactForm("Nicolás", "no-es-email", "Mensaje suficiente").email).toMatch(
      /email/i,
    );
    expect(
      validateContactForm("Nicolás", "fan@", "Mensaje suficiente").email,
    ).toBeTruthy();
  });

  it("exige un mensaje de al menos 10 caracteres", () => {
    expect(
      validateContactForm("Nicolás", "fan@correo.com", "corto").message,
    ).toMatch(/10 caracteres/i);
  });

  it("acumula todos los errores a la vez", () => {
    const errors = validateContactForm("A", "mal", "corto");

    expect(Object.keys(errors)).toEqual(["name", "email", "message"]);
  });
});
