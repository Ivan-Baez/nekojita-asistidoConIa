# Plan Técnico: Navegación por Pestañas en Next.js

## Enfoque
Crear un componente cliente en Next.js (`Navbar.tsx`) que controle el estado de la pestaña activa (`activeTab`) mediante React state o utilizando `usePathname` / `useSearchParams`.

## Componentes a Crear/Modificar
- `src/components/Navbar.tsx`: Componente de navegación con los 7 botones de pestañas.
- `src/components/TabContainer.tsx`: Renderizador condicional de la sección activa.
- `src/app/page.tsx`: Página principal que integra el Navbar y las 7 secciones.
- Barra superior con indicador activo en rojo punk (`#ff003c`).
- Uso obligatorio de la imagen `/logo2transparente.png` ubicada en la carpeta `public/` de Next.js como logotipo principal en la barra de navegación.
