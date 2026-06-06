# EvilBS Builder

Constructor visual de páginas web con Bootstrap 5, drag & drop y JavaScript vanilla.

Desarrollado por [Evilnapsis](https://evilnapsis.com/) — © 2026

---

## Características

- **Drag & Drop** — Arrastra componentes desde el panel lateral al canvas
- **Touch support** — Funciona en dispositivos móviles y tablets con gestos táctiles
- **Edición inline** — Doble clic en cualquier texto para editarlo directamente en el canvas
- **Panel de propiedades** — Edita clases CSS, colores, espaciado, tipografía y atributos HTML
- **Undo / Redo** — Historial de cambios con `Ctrl+Z` / `Ctrl+Y`
- **Vista previa** — Preview del resultado final en un modal con simulación de desktop, tablet y mobile
- **Export HTML** — Descarga el HTML limpio listo para producción con Bootstrap 5 vía CDN
- **Paneles colapsables** — El sidebar de componentes y el panel de propiedades se pueden ocultar
- **Responsive** — Interfaz adaptada para uso en móvil con drawers deslizantes

---

## Componentes disponibles

| Categoría | Componentes |
|---|---|
| **Secciones** | Hero, Features 3col, Features 4col, CTA, Navbar, Footer, Price Table, Contact Form, Carousel, Gallery |
| **Layout** | Container, Container Fluid, Section, Row, Col (auto/12/6/4/3), Div |
| **Tipografía** | H1–H4, Párrafo, Lead, Blockquote, Code, Link, Divisor |
| **Botones** | Primary, Secondary, Success, Outline, Link Button |
| **Tarjetas** | Card, Card + Imagen, Card Horizontal |
| **Alertas** | Info, Success, Danger, Warning |
| **Formularios** | Input, Email, Textarea, Select, Checkbox, Switch, Form completo |
| **Navegación** | Navbar Dark, Navbar Light, Breadcrumb, Pagination |
| **Media** | Imagen, Figure, Video Embed |
| **Listas & Tablas** | List Group, Tabla |
| **Componentes** | Badge, Badge Pill, Spinner, Progress, Accordion, Modal, Tabs, Toast |

---

## Instalación

Requiere un servidor web local (XAMPP, Laragon, WAMP, etc.).

1. Clona o descarga el proyecto en la carpeta `htdocs` de tu servidor:

```bash
git clone https://github.com/evilnapsis/evilbs-builder.git
```

2. Accede desde el navegador:

```
http://localhost/evilbs-builder/
```

> No requiere Node.js, npm ni ninguna dependencia externa. Funciona con archivos estáticos.

---

## Estructura del proyecto

```
evilbs-builder/
├── index.html                  # Interfaz principal del builder
├── README.md
└── assets/
    ├── css/
    │   └── builder.css         # Estilos del builder
    ├── js/
    │   ├── components.js       # Registro de componentes
    │   └── builder.js          # Lógica principal (estado, drag&drop, propiedades, export)
    ├── bootstrap/
    │   ├── css/bootstrap.min.css
    │   └── js/bootstrap.bundle.min.js
    └── bootstrap-icons/
        └── bootstrap-icons.css
```

---

## Atajos de teclado

| Atajo | Acción |
|---|---|
| `Ctrl + Z` | Deshacer |
| `Ctrl + Y` | Rehacer |
| `Ctrl + D` | Duplicar elemento seleccionado |
| `Delete` | Eliminar elemento seleccionado |
| `Escape` | Deseleccionar / cerrar preview |
| `Doble clic` | Editar texto inline |
| `Enter` | Confirmar edición |
| `Esc` | Cancelar edición |

---

## Uso básico

1. **Agregar un componente** — Arrastra un item del panel izquierdo al canvas
2. **Seleccionar** — Clic sobre cualquier elemento en el canvas
3. **Editar texto** — Doble clic sobre el texto a editar
4. **Editar propiedades** — Con el elemento seleccionado, usa el panel derecho para cambiar clases, colores, espaciado, etc.
5. **Reordenar** — Arrastra los elementos dentro del canvas para cambiar su posición
6. **Preview** — Botón **Preview** en la barra superior
7. **Exportar** — Botón **Export HTML** para descargar el archivo listo para producción

---

## Tecnologías

- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- JavaScript Vanilla (ES6+)
- HTML5 Drag & Drop API
- Touch Events API

---

## Licencia

© 2026 [Evilnapsis](https://evilnapsis.com/) — Todos los derechos reservados.
