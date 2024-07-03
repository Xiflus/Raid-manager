import "dotenv/config";

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, UPLOADS_DIR, ADMIN_NAME, ADMIN_PASSWORD, ADMIN_EMAIL, SECRET } = process.env;

export { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, UPLOADS_DIR, ADMIN_NAME, ADMIN_PASSWORD, ADMIN_EMAIL, SECRET };
