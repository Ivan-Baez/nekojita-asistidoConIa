## Tareas de Implementación: Secciones Públicas

### Configuración de Assets
- [x] Mover imágenes, afiches y portadas a la carpeta `/public/` de Next.js. (decisión: copiar, sin romper el `index.html` legado; alias ASCII: `afiche1.jpg`…`afiche4.jpg`)

### Desarrollo de Componentes (`src/components/sections/`)
- [x] Crear `HeroSection.tsx` con el reproductor de video de Santiago.
- [x] Crear `MusicSection.tsx` con los reproductores y estilo de cassette.
- [x] Crear `FlyersSection.tsx` organizando los afiches en un layout desordenado.
- [x] Crear `ContactSection.tsx` con el formulario y enlace a gacetilla.
- [ ] Crear `DatesSection.tsx` integrando el iframe de Google Calendar. — **bloqueado: falta URL/ID del calendario a embeber**
- [ ] Crear `FanMailSection.tsx` integrando el iframe de Google Forms. — **bloqueado: falta URL del formulario a embeber**
- [x] Crear `MerchSection.tsx` con la tarjeta “Próximamente”.

### Integración en la Vista Principal
- [ ] Importar y renderizar los 7 componentes en el contenedor de pestañas de `src/app/page.tsx`. — 5/7 integrados (`fechas` y `muro` muestran placeholder "Próximamente")
- [ ] Probar la visualización y responsividad de cada pestaña. — `next build` + `next dev` OK en Inicio; falta verificación manual de las pestañas en navegador

### Notas del implementador
- Criterio 8 (Facebook Like): implementado en `sections/FacebookLike.tsx` con SDK async de Meta, embebido en `HeroSection`.
- Contacto: validación + `mailto:` hacia `contacto@nekojita.com` (email **provisional**, confirmar). En feature 003 se conectará a la API NestJS.
- Gacetilla de prensa (PDF): botón deshabilitado hasta contar con el archivo en `public/`.
- Música: singles provisionales; solo "El pacto" (en grabación) tiene título real. Faltan audio, letras y links de descarga.

