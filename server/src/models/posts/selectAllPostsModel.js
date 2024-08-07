import getPool from "../../db/getPool.js";

const selectAllPostsModel = async (searchTerm = "", characterId = "", limit, offset) => {
	const pool = await getPool();

	const [posts] = await pool.query(
		`SELECT 
            p.id,
            p.tittle,
            p.content,
            p.character_id,
            p.character_id = ? as owner,
            c.character_name,
            COUNT(l.value) AS likes,
            BIT_OR(l.character_id = ? AND l.value = true) AS likedByMe,
            p.createdAt
        FROM posts p
        INNER JOIN characters c ON c.id = p.character_id
        LEFT JOIN likes l ON l.postId = p.id
        WHERE 
            p.tittle LIKE ? 
            OR
            p.content LIKE ?
        GROUP BY p.id
        ORDER BY p.createdAt DESC
        LIMIT ? OFFSET ?`,
		[characterId, characterId, `%${searchTerm}%`, `%${searchTerm}%`, limit, offset]
	);

	for (const post of posts) {
		// Obtenemos un array con todas las fotos de la entrada.
		const [files] = await pool.query(`SELECT id, fileName FROM postsfiles WHERE postsId = ?`, [post.id]);

		// Agregamos las fotos a la entrada actual.
		post.files = files;

		// Cambiamos el tipo de la propiedad "likes" de String a Number.
		post.likes = Number(post.likes);

		// Cambiamos el tipo de la propiedad "owner" de Number a Boolean.
		post.owner = Boolean(post.owner);

		// Cambiamos el tipo de la propiedad "likedByMe" de Number a Boolean.
		post.likedByMe = Boolean(post.likedByMe);
	}
	return posts;
};

export default selectAllPostsModel;
