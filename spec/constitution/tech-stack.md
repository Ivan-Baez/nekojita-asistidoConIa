# 📜 Constitución Técnica y Convenciones

## Frontend (Next.js)
- **Framework**: Next.js (TypeScript, React, App Router).
- **Estilos**: Tailwind CSS (estética punk/underground).
- **Navegación**: Sistema de pestañas (Tabs) con renderizado dinámico en cliente.

## Backend (NestJS)
- **Framework**: NestJS (TypeScript, API REST modular).
- **Autenticación**: JWT (`@nestjs/jwt`, `@nestjs/passport`, `bcrypt`).
- **Base de Datos**: PostgreSQL con Prisma ORM.

## Reglas Duras de Desarrollo
- **Cero registro público**: Cuentas de la banda creadas exclusivamente vía seeding en NestJS.
- **Tipado estricto**: TypeScript configurado sin uso arbitrario de `any`.
- **Control de cambios**: Ningún agente modifica rutas ni esquemas de BD sin actualizar la `spec` primero.
