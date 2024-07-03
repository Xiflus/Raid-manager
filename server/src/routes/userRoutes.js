import express from "express";

const router = express.Router();

/* router.post("/api/users/login", loginController); */

/* router.post("/api/users/characters", characterController); */

//Endpoint para crear un post
router.post("/posts", async (req, res) => {
	try {
		const { text, isPrivate } = req.body;
		let mediaPath = null;

		//verificar archivos multimedia en la solicitud
		if (req.files && req.files.media) {
			const media = req.files.media;

			const uploadPath = `${UPLOADS_DIR}/${media.name}`;
			await media.mv(uploadPath);
			mediaPath = uploadPath;
		}
		const post = await PostController.createPost({ text, isPrivate, mediaPath });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
