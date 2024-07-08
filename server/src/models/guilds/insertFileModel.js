import getPool from "../../db/getPool.js";
import uuid4 from "uuid4";

const insertFileModel = async (fileName, entryId) => {
	const pool = await getPool();
	const [file] = await pool.query(`INSERT INTO postfiles (id, filename, postid) VALUES (?, ?, ?)`, [uuid4(), fileName, entryId]);

	return file;
};

export default insertFileModel;
