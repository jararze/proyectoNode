# proyectorecuperatorio

Este es un proyecto Node.js que utiliza Express, Sequelize y MySQL para gestionar tareas y usuarios.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas antes de ejecutar este proyecto:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

## Configuración Inicial

1. Clona este repositorio:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd proyectorecuperatorio
    ```

2. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno en el archivo `.env`. Un ejemplo de configuración podría ser:

    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_de_base_de_datos
    JWT_SECRET=tu_secreto
    ```

4. Ejecuta las migraciones para configurar la base de datos:

    ```bash
    npx sequelize-cli db:migrate
    ```

## Scripts Disponibles

En el archivo `package.json` encontrarás los siguientes scripts:

- **Iniciar el servidor:**

    ```bash
    npm start
    ```

- **Ejecutar pruebas:** (actualmente no configurado)

    ```bash
    npm test
    ```

## Dependencias

El proyecto utiliza las siguientes dependencias:

- **bcrypt:** Para encriptar contraseñas.
- **dotenv:** Para gestionar variables de entorno.
- **express:** Framework para crear el servidor.
- **jsonwebtoken:** Para manejar autenticación basada en tokens.
- **mysql2:** Conector para MySQL.
- **sequelize:** ORM para manejar la base de datos.
- **sequelize-cli:** Herramienta para manejar migraciones y modelos.

## Endpoints

El proyecto contiene los siguientes endpoints definidos en las rutas:

### Rutas de Usuario

- **POST /users/register:** Registrar un nuevo usuario.
- **POST /users/login:** Iniciar sesión.

### Rutas de Tareas

- **GET /tasks:** Obtener todas las tareas.
- **POST /tasks:** Crear una nueva tarea.
- **PUT /tasks/:id:** Actualizar una tarea existente.
- **DELETE /tasks/:id:** Eliminar una tarea.

## Pruebas Locales

Puedes probar los endpoints usando herramientas como [Postman](https://www.postman.com/) o [cURL](https://curl.se/). Ejemplo:

- **Crear un usuario:**

    ```bash
    curl -X POST http://localhost:3000/users/register \
    -H "Content-Type: application/json" \
    -d '{"username": "testuser", "password": "123456"}'
    ```

- **Obtener todas las tareas:**

    ```bash
    curl -X GET http://localhost:3000/tasks \
    -H "Authorization: Bearer <TOKEN>"
    ```


## Endpoints Detallados

| Grupo       | Nombre             | Método | URL                           | Body Ejemplo             |
|-------------|--------------------|--------|-------------------------------|--------------------------|
| Users       | ListUsers          | GET    | http://localhost:3000/api/users | N/A                     |
| Users       | userById           | GET    | http://localhost:3000/api/users/2 | N/A                     |
| Users       | ActualizaUsuario   | PUT    | http://localhost:3000/api/users/2 | {"username": "JorgeArze2", "password": "password123"} |
| Users       | deleteUser         | DELETE | http://localhost:3000/api/users/3 | N/A                     |
| Users       | usuairo cambio status | PATCH | http://localhost:3000/api/users/1 | {"status": "inactive"}  |
| Tasks       | deleteTask         | DELETE | http://localhost:3000/api/tasks/4 | N/A                     |
| Tasks       | UpdateTask         | PATCH  | http://localhost:3000/api/tasks/3 | {"done": true}          |
| Tasks       | tasksUser          | GET    | http://localhost:3000/api/tasks/users/2/tasks | N/A |
| Tasks       | TaskPutId          | PUT    | http://localhost:3000/api/tasks/3 | {"name": "Cambio de tarea"} |
| Tasks       | TaksById           | GET    | http://localhost:3000/api/tasks/3 | N/A                     |
| Tasks       | ListTasks          | GET    | http://localhost:3000/api/tasks/ | {"name": "Mi primera tarea"} |
| Tasks       | CreateTask         | POST   | http://localhost:3000/api/tasks/ | {"name": "Mi tarea por oro usaurio 2"} |
