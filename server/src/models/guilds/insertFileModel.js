import getPool from "../../db/getPool";

const insertFileModel = async (fileName, postId) => {
	const pool = await getPool();
	const [file] = await pool.query(`INSERT INTO postfiles (filename, postid) VALUES (?, ?)`, [fileName, postId]);

	return file;
};

export default insertFileModel;
