/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LikeButton from "./jsxComponents/LikeButton";

const PostListItem = ({ post }) => {
	console.log("PostListItem", post);
	return (
		<li className="post-list-item">
			<Link to={`/posts/${post.id}`}>
				<h2>{post.tittle}</h2>
			</Link>
			<p>{post.content}</p>
			<div className="post-item">
				<div className="post-footer">{<LikeButton postId={post.id} initialStateLike={post.likedByMe} initialLikesCount={post.likes} />}</div>
			</div>
		</li>
	);
};
PostListItem.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		character: PropTypes.shape({
			username: PropTypes.string.isRequired,
		}),
	}).isRequired,
};

export default PostListItem;
