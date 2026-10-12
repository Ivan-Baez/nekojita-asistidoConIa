# Plan Técnico: Dashboard y Carrusel Dinámico

## Arquitectura de Componentes e Integración

### Frontend (Next.js)
- `src/app/admin/login/page.tsx`: Vista de formulario de inicio de sesión de la banda.
- `src/app/admin/dashboard/page.tsx`: Panel privado con el formulario para subir eventos.
- `src/components/Carousel.tsx`: Componente dinámico en la pestaña Inicio que realiza la petición `GET /events`.
- Manejo de estado de autenticación (guardado de token JWT en `localStorage` o cookies HTTP-Only).

### Backend (NestJS)
- `src/events/`: Módulo de eventos (`EventsController`, `EventsService`, `EventsModule`).
- DTOs para validación de entrada (`CreateEventDto`).
- Uso de `JwtAuthGuard` en la ruta `POST /events` para garantizar que solo un usuario autenticado publique contenido.
