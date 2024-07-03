import mysql from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../../env.js";

let pool;

const getPool = async () => {
  try {
    if (!pool) {
      // Crear un pool de conexión inicial sin especificar la base de datos.
      pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      });
    }

    return pool;
  } catch (err) {
    console.error(err);
  }
};

export default getPool;
