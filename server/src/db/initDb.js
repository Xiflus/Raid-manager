import mysql from "mysql2/promise";
import getPool from "./getPool.js";
import { ADMIN_NAME, ADMIN_PASSWORD, ADMIN_EMAIL, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../../env.js";

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
		console.log("Borrar tablas...");
		await pool.query(
			"DROP TABLE IF EXISTS postsFiles, posts, event_participants, raid_events, raid_progress, raid_bosses, raids,join_requests, characters, guilds, users"
		);

		console.log("Creando tablas...");

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
                userId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id)
            )	
        `);
		// Creamos la tabla de guilds_members.
		await pool.query(`
            CREATE TABLE IF NOT EXISTS characters (
                id CHAR(36) PRIMARY KEY NOT NULL,
                character_name VARCHAR(80) UNIQUE NOT NULL,
                character_avatar VARCHAR(100),
                character_class VARCHAR(100),
                role ENUM('staff', 'raider', 'normal') DEFAULT 'normal',
                guild_id CHAR(36) NOT NULL,
                user_id CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (guild_id) REFERENCES guilds(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )	
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS join_requests (
                id CHAR(36) PRIMARY KEY NOT NULL,
                character_id CHAR(36) NOT NULL,
                guild_id CHAR(36) NOT NULL,
                status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (character_id) REFERENCES characters(id),
                FOREIGN KEY (guild_id) REFERENCES guilds(id)
                )
       ` );


		// Creamos la tabla de raids.
		await pool.query(`
            CREATE TABLE IF NOT EXISTS raids (
                id CHAR(36) PRIMARY KEY NOT NULL,
                raid_name VARCHAR(80) UNIQUE NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);
		// Creamos tabla de jefes de raid.
		await pool.query(
			`CREATE TABLE IF NOT EXISTS raid_bosses (
                id CHAR(36) PRIMARY KEY NOT NULL,
                raid_id CHAR(36),
                boss_name VARCHAR(80) UNIQUE NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (raid_id) REFERENCES raids(id)
            )`
		);
		// Creamos la tabla de progreso de raid.
		await pool.query(
			`CREATE TABLE IF NOT EXISTS raid_progress (
                id CHAR(36) PRIMARY KEY NOT NULL,
                boss_id CHAR(36),
                guild_id CHAR(36),
                killedAt DATETIME,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (boss_id) REFERENCES raid_bosses(id),
                FOREIGN KEY (guild_id) REFERENCES guilds(id)
            )`
		);

		// Creamos tabla de eventos de raid.
		await pool.query(
			`CREATE TABLE IF NOT EXISTS raid_events (
                id CHAR(36) PRIMARY KEY NOT NULL,
                raid_id CHAR(36),
                event_name VARCHAR(80) UNIQUE NOT NULL,
                event_date DATETIME,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (raid_id) REFERENCES raids(id)
            )`
		);
		// Creamos la tabla de event_participants.
		await pool.query(`
            CREATE TABLE IF NOT EXISTS event_participants (
                id CHAR(36) PRIMARY KEY NOT NULL,
                raid_id CHAR(36),
                guild_id CHAR(36),
                spec ENUM('dps', 'tank', 'healer') DEFAULT 'dps',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (guild_id) REFERENCES guilds(id),
                FOREIGN KEY (raid_id) REFERENCES raids(id)
            )	
        `);
		// Creamos la tabla de posts.
		await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id CHAR(36) PRIMARY KEY NOT NULL,
                tittle VARCHAR(80) UNIQUE NOT NULL,
                content TEXT NOT NULL,
                character_id CHAR(36),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (character_id) REFERENCES characters(id)
            )	
        `);
		// Creamos la tabla de files
		await pool.query(`
            CREATE TABLE IF NOT EXISTS postsFiles (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                fileName VARCHAR(100) NOT NULL,
                postsId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (postsId) REFERENCES posts(id)
            )
        `);

		// añado el usuario admin
		await pool.query(`
            INSERT INTO users (id, email, password, username, active, role)
            VALUES (
            "34484c52-ee10-4b62-8190-9078263214af",
            "${ADMIN_EMAIL}",
            SHA2("${ADMIN_PASSWORD}", 256),
            "${ADMIN_NAME}",
            true,
            "admin");
        `);

		console.log("¡Tablas creadas!");
		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

createTables();
