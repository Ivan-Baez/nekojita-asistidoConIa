# Tareas de Implementación: Dashboard y Carrusel Dinámico

## Backend NestJS (`src/events/`)
- [x] Crear el módulo, servicio y controlador de eventos (`nest g resource events`).
- [x] Crear el DTO `CreateEventDto` con validaciones (`class-validator`).
- [x] Implementar `POST /events` con `JwtAuthGuard` para guardar en PostgreSQL.
- [x] Implementar `GET /events` público ordenado por fecha de evento.

## Frontend Next.js (Admin & Auth)
- [x] Crear la página de Login (`/admin/login`) conectada a `POST /auth/login`.
- [x] Crear el formulario del Dashboard (`/admin/dashboard`) con validación de campos.
- [x] Implementar el envío de datos al endpoint `POST /events` adjuntando el token JWT.

## Frontend Next.js (Carrusel Dinámico)
- [x] Crear el componente `Carousel.tsx` para la pestaña "Inicio".
- [x] Hacer fetch a `GET /events` y renderizar las tarjetas con imagen, título, fecha y mensaje.
- [x] Probar el flujo completo: Login ➔ Crear evento en Dashboard ➔ Ver evento publicado en la Home.
- [x] Crear la página de login en ruta oculta sin enlace público en la navegación.
- [x] Proteger las rutas del dashboard con autenticación JWT para que solo los integrantes de la banda puedan modificar el carrusel.

### Notas del implementador
- Rutas ocultas: `/admin/login` y `/admin/dashboard` (cero enlaces en Navbar/Footer; verificado: 0 menciones de "admin" en el HTML público).
- Guard del dashboard: client-side — sin token o con token inválido (`GET /auth/profile`) → redirect a `/` (inicio público). Protección real de datos: `JwtAuthGuard` en `POST /events` (401 sin token).
- Token guardado en `localStorage` (`nekojita_token`), decisión del plan.md.
- API client centralizado en `frontend/src/services/api.ts` + `token.ts`; `NEXT_PUBLIC_API_URL=http://localhost:3001` en `.env.local`.
- `next.config.ts`: `images.remotePatterns` para localhost:3000/3001 y cualquier https (los afiches de eventos pueden venir de YouTube).
- Carrusel: scroll horizontal con snap + tarjetas (imagen, fecha formateada es-AR, nombre, mensaje); estados loading/vacío/error.
- Subida de archivo de imagen: **pendiente** (requiere almacenamiento/multer); por ahora solo URL. `IsUrl` con `require_tld: false` para permitir localhost en desarrollo.
- Datos de prueba en la DB: 4 eventos (fechas 2026-11-23 … 2027-06-10) creados con las cuentas del seed.
- Tests frontend (`npm test`, vitest + jsdom + testing-library): Navbar, TabContainer (7 secciones), Carousel (loading/vacío/error), validación de contacto y servicio de token.
- Los e2e del backend cubren el flujo login ➔ token ➔ POST /events ➔ GET /events.

