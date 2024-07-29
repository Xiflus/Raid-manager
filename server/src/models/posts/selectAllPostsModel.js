import getPool from "../../db/getPool.js";

const selectAllPostsModel = async (title = "", content = "", characterId = "", limit, offset) => {
	const pool = await getPool();

	const [posts] = await pool.query(
		`SELECT 
		p.id,
		p.tittle,
		p.content,
        p.character_id=? as owner,
        AVG(IFNULL(l.value,0))AS likes,
        BIT_OR(l.character_id=?) AS likedByMe,
		p.createdAt,
		FROM posts p
		INNER JOIN characters c ON p.character_id = c.id
        LEFT JOIN likes l ON p.id = l.post_id
        WHERE 
		p.tittle LIKE ? 
		AND
		p.content LIKE ?
		AND
		p.character_name LIKE ?
		GROUP BY g.id
		ORDER BY g.createdAt DESC
		LIMIT ? OFFSET ?`,
		[characterId, characterId, `%${title}%`, `%${content}%`, limit, offset]
	);
	for (const post of posts) {
		// Obtenemos un array con todas las fotos de la entrada.
		const [files] = await pool.query(`SELECT id, name FROM postfiles WHERE postsId = ?`, [post.id]);

		// Agregamos las fotos a la entrada actual.
		post.files = files;

		// Cambiamos el tipo de la propiedad "likes" de String a Number.
		post.likes = Number(post.likes);

		// Cambiamos el tipo de la propiedad "owner" de Number a Boolean.
		post.owner = Boolean(post.owner);

		// Cambiamos el tipo de la propiedad "votedByMe" de Number a Boolean.
		post.likedByMe = Boolean(post.likedByMe);
	}

	return posts;
};

export default selectAllPostsModel;
