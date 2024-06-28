import mysql from "mysql2/promise";
import getPool from "./getPool.js";
import { ADMIN_NAME, ADMIN_PASSWORD, ADMIN_EMAIL, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '../../env.js';

const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

    await connection.end();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const createTables = async () => {
    try {
        await createDatabase();
        const pool = await getPool();
        console.log('Borrar tablas...');
        await pool.query(
            'DROP TABLE IF EXISTS posts, raid_participants, raids, guild_members, guilds, users',
        );

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                active BOOLEAN DEFAULT false,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);
        // Creamos la tabla de guilds.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS guilds (
                id CHAR(36) PRIMARY KEY NOT NULL,
                name VARCHAR(80) UNIQUE NOT NULL,
                avatar VARCHAR(100),
                description TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);
        // Creamos la tabla de guilds_members.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS guild_members (
                id CHAR(36) PRIMARY KEY NOT NULL,
                caracter_name VARCHAR(80) UNIQUE NOT NULL,
                caracter_avatar VARCHAR(100),
                caracter_class VARCHAR(100),
                role ENUM('staff', 'normal', 'raider') DEFAULT 'normal',
                guild_id CHAR(36) NOT NULL,
                user_id CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (guild_id) REFERENCES guilds(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )	
        `);
        // Creamos la tabla de raids.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS raids (
                id CHAR(36) PRIMARY KEY NOT NULL,
                raid_name VARCHAR(80) UNIQUE NOT NULL,
                raid_date VARCHAR(100),
                raid_progress INT,
                guild_id CHAR(36),
                FOREIGN KEY (guild_id) REFERENCES guilds(id)

            )	
        `);
        // Creamos la tabla de raid_participants.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS raid_participants (
                id CHAR(36) PRIMARY KEY NOT NULL,
                raid_id CHAR(36),
                guild_m_id CHAR(36),
                spec ENUM('dps', 'tank', 'healer') DEFAULT 'dps',
                FOREIGN KEY (guild_m_id) REFERENCES guild_members(id),
                FOREIGN KEY (raid_id) REFERENCES raids(id)
            )	
        `);
        // Creamos la tabla de posts.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id CHAR(36) PRIMARY KEY NOT NULL,
                tittle VARCHAR(80) UNIQUE NOT NULL,
                content TEXT NOT NULL,
                file VARCHAR(100),
                guild_m_id CHAR(36),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (guild_m_id) REFERENCES guild_members(id)
            )	
        `);

        // añado el usuario admin 
        await pool.query (`
            INSERT INTO users (id, email, password, username, active, role)
            VALUES (
            "34484c52-ee10-4b62-8190-9078263214af",
            "${ADMIN_EMAIL}",
            SHA2("${ADMIN_PASSWORD}", 256),
            "${ADMIN_NAME}",
            true,
            "admin");
        `);


        console.log('¡Tablas creadas!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createTables();