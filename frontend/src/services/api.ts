export interface CarouselEvent {
  id: string;
  eventName: string;
  eventDate: string;
  message: string | null;
  imageUrl: string | null;
  createdById: string;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface FanWallMessage {
  id: number;
  author: string;
  message: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export function getApiUrl(): string {
  return API_URL;
}

export async function fetchEvents(): Promise<CarouselEvent[]> {
  const response = await fetch(`${API_URL}/events`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los eventos");
  }

  return (await response.json()) as CarouselEvent[];
}

export async function fetchFanWallMessages(): Promise<FanWallMessage[]> {
  const response = await fetch(`${API_URL}/fan-wall`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los mensajes");
  }

  return (await response.json()) as FanWallMessage[];
}

export async function createFanWallMessageRequest(message: {
  author: string;
  message: string;
}): Promise<FanWallMessage> {
  const response = await fetch(`${API_URL}/fan-wall`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error("No se pudo pegar el mensaje en la pared");
  }

  return (await response.json()) as FanWallMessage;
}

export async function loginRequest(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  return (await response.json()) as LoginResponse;
}

export async function createEventRequest(
  token: string,
  event: {
    eventName: string;
    eventDate: string;
    message?: string;
    imageUrl?: string;
  },
): Promise<CarouselEvent> {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(event),
  });

  if (response.status === 401) {
    throw new Error("Sesión expirada, volvé a iniciar sesión");
  }

  if (!response.ok) {
    throw new Error("No se pudo crear el evento");
  }

  return (await response.json()) as CarouselEvent;
}

export async function verifyTokenRequest(
  token: string,
): Promise<boolean> {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.ok;
}
