// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos las entradas.
import { notFoundError } from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos retornar una entrada concreta.
const selectPostByIdModel = async (postId, characterId = "") => {
	const pool = await getPool();

	// Intentamos localizar la entrada con el id recibido.
	const [posts] = await pool.query(
		`
            SELECT 
                p.id,
                p.tittle,
                p.content,
               
                p.character_id,
                p.character_id = ? AS owner,
                c.caracter_name,
                AVG(IFNULL(v.value,0))AS likes,
                BIT_OR(v.character_id=?) AS likedByMe,
                p.createdAt
            FROM posts p
		    INNER JOIN characters c ON p.character_id = c.characterId
            LEFT JOIN votes v ON p.id = v.post_id
            WHERE p.id = ?
        `,
		[characterId, characterId, postId]
	);

	// Si no existe la entrada lanzamos un error.
	if (posts.length < 1 || posts[0].id === null) {
		notFoundError("post");
	}

	// Obtenemos un array con todas las fotos de la entrada.
	const [files] = await pool.query(`SELECT id, fileName FROM postfiles WHERE postsId = ?`, [postId]);

	// Agregamos las fotos a la entrada que está en la posición 0.
	posts[0].files = files;

	// Cambiamos el tipo de la propiedad "votes" de String a Number.
	posts[0].likes = Number(posts[0].likes);

	// Cambiamos el tipo de la propiedad "owner" de Number a Boolean.
	posts[0].owner = Boolean(posts[0].owner);

	// Cambiamos el tipo de la propiedad "votedByMe" de Number a Boolean.
	posts[0].likedByMe = Boolean(posts[0].likedByMe);

	// Retornamos la entrada de la posicón 0 con las fotos.
	return posts[0];
};

export default selectPostByIdModel;
