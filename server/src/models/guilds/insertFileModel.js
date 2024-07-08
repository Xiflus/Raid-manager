import getPool from "../../db/getPool.js";
import uuid4 from "uuid4";

const insertFileModel = async (fileName, entryId) => {
	const pool = await getPool();
	const fileId = uuid4();
	const [file] = await pool.query(`INSERT INTO postsfiles (id, filename, postsId) VALUES (?, ?, ?)`, [fileId, fileName, entryId]);

	return file;
};

export default insertFileModel;
