import { totalPostCountModel, selectAllPostsModel } from "../../models/guilds/index.js";

const postsListController = async (req, res, next) => {
	try {
		let { title, content, file, page = 1 } = req.query;

		page = Number(page);
		const limit = 3;
		const offset = (page - 1) * limit;
		const totalPosts = await totalPostCountModel();
		const totalPages = Math.ceil(totalPosts / limit);

		const posts = await selectAllPostsModel(title, content, author, req.character?.Id, limit, offset);
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
