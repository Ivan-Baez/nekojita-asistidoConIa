# 🤖 Guía de Agentes y Arnés de Contexto: Proyecto Nekojita

Bienvenido al repositorio de **Nekojita Web**.  
Este proyecto sigue la metodología de **Spec-Driven Development (SDD)**.  
Antes de realizar cualquier modificación o escribir código, **DEBES** leer y seguir estrictamente las reglas descritas en este documento.

---

## 📐 1. Principios y Reglas Duras de Desarrollo (Hard Rules)

1. **Especificación Primero (SDD)**: Nunca escribas código sin antes consultar la carpeta `spec/`.
2. **Fuentes de Verdad**:
   - `spec/constitution/tech-stack.md`: Reglas del stack técnico y dependencias permitidas.
   - `spec/constitution/roadmap.md`: Estado y prioridad de las características.
   - `spec/features/NNN-[nombre]/`: Especificación (`spec.md`), Plan (`plan.md`) y Tareas (`tasks.md`) de la característica activa.
3. **No Romper el Contrato**: Si una tarea requiere cambiar la base de datos o una API, debes pedir confirmación o actualizar el archivo `spec.md` correspondiente antes de implementar.
4. **Validación Estricta**: Todo el código debe pasar el linter y compilador TypeScript sin advertencias ni errores antes de marcar una tarea como completada en `tasks.md`.

---

## 🛠️ 2. Tech Stack del Proyecto

- **Frontend**: Next.js (React, TypeScript, App Router, Tailwind CSS).
- **Backend**: NestJS (TypeScript, API REST, Controllers, Services, DTOs).
- **Base de Datos**: PostgreSQL con Prisma ORM (o TypeORM).
- **Autenticación**: JWT (JSON Web Tokens) con `@nestjs/passport` y `bcrypt`.

---

## 📂 3. Estructura del Repositorio

```text
proyecto-nekojita/
├── AGENTS.md                  # Este arnés de contexto
├── spec/                      # Especificaciones de SDD
│   ├── constitution/          # Reglas globales del proyecto
│   └── features/              # Especificaciones por característica
├── frontend/                  # Aplicación Next.js
│   ├── src/
│   │   ├── app/               # Rutas y páginas (App Router)
│   │   ├── components/        # Componentes de React (Navbar, Carrusel, etc.)
│   │   └── services/          # Cliente de API para conectar con NestJS
│   └── public/                # Assets multimedia (imágenes, afiches, audio)
└── backend/                   # Aplicación NestJS
    ├── src/
    │   ├── auth/              # Módulo de Autenticación JWT
    │   ├── events/            # Módulo de Eventos para el Carrusel
    │   └── users/             # Módulo de Usuarios de la banda
    └── prisma/                # Esquema de DB y migraciones PostgreSQL

## 🚀 4\. Comandos de Entorno y Ejecución

Al trabajar en tareas específicas, utiliza los siguientes comandos estándar según la parte del proyecto en la que estés trabajando:

### Backend (NestJS)

# 🚀 Comandos Backend (NestJS + PostgreSQL)

```bash

# Navegar a la carpeta backend
cd backend

# Iniciar servidor en modo desarrollo con recarga automática
npm run start:dev

# Ejecutar migraciones de base de datos PostgreSQL
npx prisma migrate dev

# Poblado inicial de datos (Seeding de usuarios de la banda)
npx prisma db seed

# 🚀 Comandos Frontend (Next.js)

```bash

# Navegar a la carpeta frontend
cd frontend

# Iniciar servidor de desarrollo en http://localhost:3000
npm run dev

# Compilar proyecto y verificar errores de TypeScript
npm run build

## 🔄 5\. Flujo de Trabajo Obligatorio para el Agente

Cuando se te asigne una tarea, debes ejecutar los siguientes pasos en orden:

1. **Leer la especificación**: Abre `spec/features/NNN-[feature]/spec.md` para entender qué se espera.
2. **Revisar el plan técnico**: Lee `plan.md` en la misma carpeta para conocer los componentes y archivos involucrados.
3. **Consultar la lista de tareas**: Abre `tasks.md` e identifica la siguiente tarea pendiente (`- [ ]`).
4. **Implementar el código**: Escribe o modifica el código respetando los tipos de TypeScript y las reglas de `tech-stack.md`.
5. **Verificar y Marcar**: Prueba los cambios, asegúrate de que compile correctamente y cambia el estado de la tarea en `tasks.md` a completada (`- [x]`).

## 👥 6. Roles y Subagentes

- **Coordinator**: Revisa el roadmap y delega el trabajo de la feature activa.  
- **Implementer**: Modifica o crea componentes en Next.js o módulos en NestJS.  
- **Verifier**: Audita el código, ejecuta el compilador TypeScript/linter y confirma el cumplimiento de los criterios en `spec.md`.  
