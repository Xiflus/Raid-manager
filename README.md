# Raid Manager

Se trata de una aplicación externa para Wolrd of Warcraft, orientada en la gestion de hermandades para la realizacion de raids, creacion de eventos dentro del juego y reclutamiento de miembros

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear la base de datos, tablas, un usuario admin.

4. Ejecutar `npm run dev` para lanzar el servidor.

5. Endpoints postman preparados con la autorización vacía, se indica en los headers cual requiere token de autorización.

## Base de datos

## Endpoints del usuario ❗❗❗❗

- **POST** - `/users/register` - Crea un nuevo usuario pendiente de activar.
- **PUT** - `/users/validate/:registrationCode` - Valida a un usuario recién registrado.
- **POST** - `/users/login` - Logea a un usuario retornando un token. ✅
- **GET** - `/users/:userId` - Retorna información pública de un usuario (ver el perfil).
- **GET** - `/users` - Retorna información privada del usuario con el id del token. ✅
- **PUT** - `/users/avatar` - Permite actualizar el avatar del usuario.

## Endpoints Hermandad

- **GET** - `/guilds` - Retorna información pública de las hermandades✅
- **GET** - `/guilds/:guildId` -Retorna hermandad por Id
- **GET** - `/guilds/:guildId/posts`- Retorna todos los posts de una hermandad
- **GET** - `/guilds/:guildId/posts/:postId`-Retorna un post por Id
- **POST** - `/guilds` - Crea una nueva hermandad✅
- **POST** - `/guilds/join` - Manda solicitud de union a hermandad
- **POST** - `/guilds/posts` - Crea nuevo post dentro de hermandad
- **DELETE** - `/guilds/:guildId` - Editar información o detalles de la guild✅
