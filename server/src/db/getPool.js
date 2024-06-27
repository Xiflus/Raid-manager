import mysql from "mysql2/promise";

import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../../env.js";

let pool;

const getPool = async () => {
	try {
		if (!pool) {
			pool = await mysql.createPool({
				host: DB_HOST,
				user: DB_USER,
				password: DB_PASSWORD,
				database: DB_NAME,
			});
		}

		await pool.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
		console.log(`Database ${DB_NAME} created`);

		pool = await mysql.createPool({
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASSWORD,
			database: DB_NAME,
		});
		console.log(pool.database);
		return pool;
	} catch (error) {
		console.error(error);
	}
};

export default getPool;
