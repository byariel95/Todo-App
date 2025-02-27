# ToDo App

Este proyecto es una aplicación de tareas (ToDo) desarrollada con Node JS como backend y React como frontend.

## Características

- Crear tareas
- Editar tareas
- Eliminar tareas
- Marcar tareas como completadas
- Ver tareas completadas
- Ver tareas pendientes

## Instalación backend via Docker

1. Clonar el repositorio
2. ubicarse en el directorio raiz
3. Ejecutar los siguientes comandos `docker-compose build` y `docker-compose up -d`
4. Asegúrese que el contenedor se este ejecutando, en el navegador vaya a la siguiente ruta: `http://localhost:8000`
5. Asegúrese de ver el siguiente mensaje: `{"message": "Server is running..!"}`

## Instalación backend (2da Opcion)

1. Clonar el repositorio
2. ubicarse en el directorio raiz
3. Instalar las dependencias con `npm install` o `pnpm install`
4. crear archivo .env y agregar las variables de entorno utilizar los datos del archivo example.env buscar en este repositorio el archivo Guia Instalacion.pdf para mas informacion.
5. Iniciar el servidor con `npm run dev` o `pnpm install`

## Instalación Frontend

1. Clonar el repositorio
2. ubicarse en el directorio raiz
3. Instalar las dependencias con `npm install` o `pnpm install`
4. Iniciar el proyecto con `npm run dev`
5. Abrir el navegador en `http://localhost:5173`

## Uso

1. Crear una cuenta o iniciar sesión
2. Crear tareas
3. Editar tareas
4. Eliminar tareas
5. Marcar tareas como completadas

## Licencia

Este proyecto está bajo la licencia MIT.
