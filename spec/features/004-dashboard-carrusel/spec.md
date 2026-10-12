# Especificación: Dashboard Privado y Carrusel Dinámico (Next.js + NestJS)

## Visión General
Desarrollar un panel de administración privado en Next.js para los integrantes de la banda y conectar el carrusel de eventos de la página de inicio con la API de NestJS y la base de datos PostgreSQL.

## Criterios de Aceptación

- [x] **Vista de Login e Interfaz Privada**
  - Modal o ruta `/admin/login` con formulario de acceso.
  - Redirección al Dashboard (`/admin/dashboard`) únicamente para usuarios con token JWT válido.

- [x] **Formulario de Publicación de Eventos en el Dashboard**
  - Nombre del evento (campo de texto).
  - Fecha del evento (selector de fecha).
  - Mensaje / subtítulo aclaratorio (área de texto).
  - Carga de imagen o URL del afiche/foto. *(solo URL por ahora; subida de archivo pendiente de almacenamiento)*

- [x] **API Backend (NestJS)**
  - Endpoint protegido `POST /events` para registrar eventos en PostgreSQL.
  - Endpoint público `GET /events` para consultar los eventos publicados.

- [x] **Carrusel Dinámico (Next.js)**
  - Componente de carrusel en la pestaña **Inicio** que consuma `GET /events` y renderice las tarjetas de los eventos activos.

- [x] **🔒 Seguridad de Acceso al Dashboard**

  - Ruta Oculta: El acceso al Dashboard y la gestión del carrusel/muro **NO debe tener botón público** en el `Navbar` ni en el `Footer`.
  - URL de acceso: Solo se ingresa mediante una ruta privada (ejemplo: `/panel-banda` o `/secret-admin`).
  - Protección Backend: Endpoints protegidos en NestJS mediante **JWT**.
  - Si alguien intenta entrar sin sesión, Next.js debe redirigir automáticamente a una página **404** o al inicio público.

