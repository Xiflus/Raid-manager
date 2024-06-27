import "dotenv/config";

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, UPLOADS_DIR } = process.env;

export { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, UPLOADS_DIR };
