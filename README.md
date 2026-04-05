# todo-wav

## Descripción
Una aplicación de lista de tareas pendiente (To-Do List) moderna y responsiva, construida con React y TypeScript. Permite a los usuarios añadir, gestionar y seguir sus tareas de manera eficiente.

## Características
- Añadir nuevas tareas con título, descripción y fecha de vencimiento.
- Marcar tareas como completadas.
- Gestión de estado persistente con Zustand.
- Interfaz de usuario intuitiva y atractiva.

## Tecnologías
- **Framework**: React.js
- **Lenguaje**: TypeScript
- **Bundler**: Vite
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Gestión de estado**: Zustand

## Empezando

### Prerrequisitos
Asegúrate de tener [Node.js](https://nodejs.org/es/) (versión 18 o superior) y [pnpm](https://pnpm.io/) instalados en tu máquina.

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/todo-wav.git
    cd todo-wav
    ```
2.  Instala las dependencias:
    ```bash
    pnpm install
    ```

### Ejecución
Para iniciar la aplicación en modo de desarrollo:
```bash
pnpm run dev
```
Esto iniciará el servidor de desarrollo en `http://localhost:5173` (o un puerto similar).

### Construcción
Para construir la aplicación para producción:
```bash
pnpm run build
```
Los archivos de construcción se generarán en el directorio `dist/`.

### Linting
Para ejecutar el linter:
```bash
pnpm run lint
```

## Contribuciones
¡Las contribuciones son bienvenidas! Por favor, abre un "issue" para discutir los cambios propuestos o envía un "pull request".

## Licencia
Este proyecto está bajo la Licencia MIT.
