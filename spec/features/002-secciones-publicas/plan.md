# Plan Técnico: Secciones Públicas en Next.js

## Arquitectura de Componentes (React)
Crear componentes modulares dentro de `src/components/sections/` para mantener el código limpio y mantenible:

- `HeroSection.tsx`: Video embebido + contenedor del carrusel.
- `MusicSection.tsx`: Tarjetas de singles + reproductor de audio/descargas.
- `FlyersSection.tsx`: Collage/Grid de imágenes de afiches.
- `ContactSection.tsx`: Formulario de contacto + enlace a gacetilla.
- `DatesSection.tsx`: Componente iframe de Google Calendar.
- `FanWallSection.tsx`: Componente iframe de Google Forms.
- `MerchSection.tsx`: Galería de productos promocionales.

## Manejo de Assets
- Ubicar imágenes, afiches y archivos multimedia en la carpeta `public/` de Next.js.
- Utilizar el componente `Image` de Next.js para optimización automática de imágenes.
- La carpeta `public/` contendrá las variantes de los logos oficiales (`logo2transparente.png`, `transparaentelogo1.png`, `logo1.jpg`, etc.) para ser usados en la marca del sitio, el footer y los componentes.