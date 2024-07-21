import { totalPostCountModel, selectAllPostsModel } from "../../models/guilds/index.js";

const postsListController = async (req, res, next) => {
	try {
		let { title, content, page = 1 } = req.query;

		page = Number(page);
		const limit = 4;
		const offset = (page - 1) * limit;
		const totalPosts = await totalPostCountModel();
		const totalPages = Math.ceil(totalPosts / limit);
		const userId = req.user.id;
		// const characters = await getUserCharacterListModel(userId);

		const posts = await selectAllPostsModel(title, content, req.character?.id, limit, offset);
		res.send({
			status: "ok",
			data: {
				posts,
				totalPages,
				currentPage: page,
				totalPosts,
				prevPage: page > 1 ? page - 1 : null,
				nextPage: page < totalPages ? page + 1 : null,
			},
		});
	} catch (error) {
		next(error);
	}
};

export default postsListController;
