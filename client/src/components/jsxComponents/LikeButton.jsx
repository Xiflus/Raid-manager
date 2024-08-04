import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { likePostsService } from "../../../services/postServices";
import { CharacterContext } from "../../context/CharacterContext";
import toast from "react-hot-toast";

const LikeButton = ({ postId, initialStateLike, initialLikesCount }) => {
	const { selectedCharacter } = useContext(CharacterContext);

	const characterId = selectedCharacter[0]?.id;
	console.log("LikeButton/characterId", characterId);

	const [likedByMe, setLikedByMe] = useState(initialStateLike);
	const [likes, setLikes] = useState(initialLikesCount);
	const handleLike = async () => {
		const guildId = window.location.pathname.split("/")[2];
		const value = !likedByMe;

		setLikedByMe(value);
		setLikes(value ? likes + 1 : likes - 1);

		try {
			const response = await likePostsService(guildId, postId, value, characterId);
			setLikes(response.likes);
			console.log("likeButton/handleLike/response", response.likes);
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div className="like-button">
			<span className="likes">Likes: {likes}</span>
			<button onClick={handleLike} className={`like-button ${likedByMe ? "liked" : ""}`}>
				{likedByMe ? "Liked" : "Like"}
			</button>
		</div>
	);
};
LikeButton.propTypes = {
	postId: PropTypes.string.isRequired,
	initialStateLike: PropTypes.bool.isRequired,
	initialLikesCount: PropTypes.number.isRequired,
};

export default LikeButton;
