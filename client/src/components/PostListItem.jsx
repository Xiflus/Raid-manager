import PropTypes from "prop-types";
import LikeButton from "./jsxComponents/LikeButton";

const PostListItem = ({ post }) => {
	console.log("Post data:", post);

	return (
		<li className="border-2 w-full p-3 bg-gray-900 text-white border-orange-500 rounded-lg placeholder focus:outline-none  m-px">
			<h2 className="text-xl font-medium center">{post.tittle}</h2>
			<p>{post.content}</p>
			<div className="post-item">
				<div className="post-footer">
					<LikeButton postId={post.id} initialStateLike={post.likedByMe} initialLikesCount={post.likes} />
				</div>
			</div>
		</li>
	);
};

PostListItem.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		tittle: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		character: PropTypes.shape({
			username: PropTypes.string.isRequired,
		}),
		likes: PropTypes.number.isRequired,
		likedByMe: PropTypes.bool.isRequired,
	}).isRequired,
};

export default PostListItem;
