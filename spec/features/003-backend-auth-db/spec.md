# Especificación: Backend, Autenticación y PostgreSQL (NestJS)

## Visión General
Configurar el servidor backend en NestJS, conectar la base de datos PostgreSQL mediante un ORM (Prisma o TypeORM) y crear el sistema de autenticación JWT para el acceso exclusivo de los miembros de Nekojita.

## Criterios de Aceptación
- [x] Base de datos PostgreSQL configurada con las tablas base:
  - `User`: Administradores/integrantes de la banda.
  - `CarouselEvent`: Eventos publicados para el carrusel de la Home.
- [x] Endpoint de autenticación `POST /auth/login` con validación de contraseña hasheada (bcrypt).
- [x] Guard de autenticación JWT (`JwtAuthGuard`) para proteger rutas privadas en NestJS.
- [x] Script de inicialización/seeding para crear las cuentas de los integrantes de la banda (sin registro público).
