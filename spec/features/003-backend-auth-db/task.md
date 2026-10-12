# Tareas de Implementación: Backend NestJS + PostgreSQL

## Configuración del Proyecto NestJS
- [x] Inicializar la aplicación NestJS.
- [x] Instalar dependencias principales: `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt`, `@prisma/client` (o `typeorm` + `pg`).

## Base de Datos y Modelos
- [x] Configurar variables de entorno (`.env`) con la URL de conexión a PostgreSQL.
- [x] Definir el esquema con los modelos `User` y `CarouselEvent` y ejecutar la migración inicial.
- [x] Crear el script de seeding para poblar los usuarios de los integrantes de la banda.

## Módulo de Autenticación (`AuthModule`)
- [x] Implementar `UsersService` para consulta y verificación de credenciales.
- [x] Implementar `AuthService` para validación y firma de tokens JWT.
- [x] Crear el controlador `AuthController` con la ruta `POST /auth/login`.
- [x] Configurar `JwtAuthGuard` para restringir el acceso a rutas protegidas.

## Verificación
- [x] Probar el login con credenciales válidas e inválidas.
- [x] Validar la correcta emisión y estructura del token JWT devuelto.

### Notas del implementador
- Stack: NestJS 12 + Prisma **7.10.0** (requiere `prisma.config.ts` + driver adapter `@prisma/adapter-pg`; el `url` ya no va en `schema.prisma`).
- Modelo `User` según `spec/database/schema.md`: `email` único + `role` (se descartó el `username` del plan.md por conflicto entre fuentes de verdad; decisión del usuario).
- Puerto del backend: **3001** (el 3000 lo usa Next.js). CORS habilitado para `http://localhost:3000`.
- Seed (`npm run seed`): 4 integrantes (`nflores@`, `nlucero@`, `ncastro@`, `jblengini@` `nekojita.com`) con clave provisoria `nekojita2024` — **cambiar antes de producción**.
- Verificación: login válido 200 + token, contraseña incorrecta 401, email inexistente 401, body inválido 400, `GET /auth/profile` sin token 401 y con token 200 (payload `sub`/`email`/`role`/`iat`/`exp`, HS256).
- Endpoint protegido de ejemplo: `GET /auth/profile` (valida el `JwtAuthGuard`). Falta el CRUD de `CarouselEvent` (feature 004).
- npm requiere `--legacy-peer-deps` en este entorno (bug de arborist con vitest/typescript 6).
- Tests agregados después de cerrar la feature: unit (`npm test`: auth.service, jwt.strategy, events.service) y e2e (`npm run test:e2e`: login/profile/events contra PostgreSQL local). El e2e usa las cuentas del seed y borra los eventos que crea.
