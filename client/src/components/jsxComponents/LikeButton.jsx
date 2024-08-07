import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { likePostsService } from "../../../services/postServices";
import { CharacterContext } from "../../context/CharacterContext";
import { showToast } from "../../utils/toast.jsx";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const LikeButton = ({ postId, initialStateLike, initialLikesCount }) => {
	const { selectedCharacter } = useContext(CharacterContext);
	const characterId = selectedCharacter[0]?.id;
	const [likedByMe, setLikedByMe] = useState(initialStateLike);
	const [likes, setLikes] = useState(initialLikesCount);
	const { guildId } = useParams();

	const handleLike = async () => {
		const value = !likedByMe;
		try {
			const response = await likePostsService(guildId, postId, value, characterId);
			setLikedByMe(response.likedByMe);
			setLikes(response.likes);
		} catch (err) {
			showToast(err.message, "error");
		}
	};

	return (
		<div className="like-button">
			<button onClick={handleLike} className="focus:outline-none">
				<FontAwesomeIcon icon={likedByMe ? solidHeart : regularHeart} className={`text-base ${likedByMe ? "text-red-500" : "text-gray-400"}`} />
				<span className="ml-px ">{likes}</span>
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
