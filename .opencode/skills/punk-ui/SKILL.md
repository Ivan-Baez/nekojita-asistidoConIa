# 🎸 Skill: Estética Punk Rock & Sistema de Diseño UI (Next.js + Tailwind CSS)

## 🎨 1. Identidad Visual y Paleta de Colores
- **Fondo Principal**: `#0a0a0a` / `#121212` (Negro absoluto / Gris carbón mate).
- **Color de Acento (Punk Red)**: `#ff003c` / `#e63946` (Rojo neón / carmesí intenso para estados activos, bordes y botones).
- **Texto y Contrastes**: `#f1f1f1` (Blanco tiza/hueso) y `#a3a3a3` (Gris medio para subtítulos y fechas).
- **Bordes y Sombras**: Bordes sólidos (`border-2 border-neutral-800`), sombras brutales sin difuminado suave (`shadow-[4px_4px_0px_0px_rgba(255,0,60,1)]`).

## 🖋️ 2. Tipografía y Estilizado
- **Títulos y Encabezados**: Mayúsculas sostenidas (`uppercase`), estilo impactante y pesado (`font-black`, `tracking-wider`).
- **Cuerpo de Texto**: Sans-serif o Monospace limpia y de alto contraste para lectura en móviles.

## 🖼️ 3. Reglas de Componentes UI (`src/components/sections/`)

### 🎬 Hero & Video (`HeroSection.tsx`)
- Video responsivo (16:9) del recital en Santiago de Chile.
- Marco oscuro estilo underground.
- Embed de YouTube (`https://www.youtube.com/watch?v=pe_sbPeM19w`) o HTML5 con overlay de texto promocional.

### 📼 Reproductor Estilo Cassette (`MusicSection.tsx`)
- Tarjetas con diseño analógico de cassette (carcasa oscura, etiqueta blanca/roja retro).
- Botones: "Escuchar Single", "Ver Letras", "Descargar Cassette".

### 📌 Muro de Flyers Desordenados (`FlyersSection.tsx`)
- Grid responsivo (`grid-cols-1 md:grid-cols-3`).
- Rotaciones CSS para simular afiches pegados:
  - Afiche 1: `transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300`
  - Afiche 2: `transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300`
  - Afiche 3: `transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300`
- Uso obligatorio de `Image` de Next.js optimizado.

### 🎛️ Navbar y Pestañas (`Navbar.tsx`)
- Barra superior con indicador activo en rojo punk (`#ff003c`).
- Transición fluida entre las 7 pestañas sin recarga.

### 📝 Formularios e Inputs (`ContactSection.tsx`, `AdminDashboard`)
- Inputs oscuros (`bg-neutral-900 border-2 border-neutral-700 text-white focus:border-[#ff003c]`).
- Botones brutalistas con feedback visual inmediato en hover.
