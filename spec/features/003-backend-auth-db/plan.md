# Plan Técnico: Backend NestJS, Auth y PostgreSQL

## Arquitectura del Backend
Estructura modular de NestJS dentro del proyecto backend (`server/` o monorepo):

- `src/prisma/` (o configuración del ORM): Esquema de datos y cliente de conexión PostgreSQL.
- `src/auth/`: Módulo de autenticación (`AuthController`, `AuthService`, `JwtStrategy`, `JwtAuthGuard`, DTOs).
- `src/users/`: Módulo de usuarios (`UsersService` para búsqueda y seeding de integrantes).

## Esquema de Base de Datos Recomendado
- **User**: `id`, `username`, `passwordHash`, `createdAt`.
- **CarouselEvent**: `id`, `eventName`, `eventDate`, `message`, `imageUrl`, `createdById`, `createdAt`.

## Seguridad
- Contraseñas encriptadas con `bcrypt`.
- Emisión de token JWT firmado al iniciar sesión correctamente.
