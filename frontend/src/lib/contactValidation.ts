export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function validateContactForm(
  name: string,
  email: string,
  message: string,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (name.trim().length < 2) {
    errors.name = "Ingresá tu nombre (mínimo 2 caracteres).";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Ingresá un email válido.";
  }

  if (message.trim().length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  }

  return errors;
}
