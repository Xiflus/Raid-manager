import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const InboxIcon = ({ guildId, requestCount }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/guilds/${guildId}/join-requests`);
	};

	return (
		<div className="relative inline-block cursor-pointer" onClick={handleClick}>
			<FontAwesomeIcon icon={faInbox} size="2x" />
			{requestCount > 0 && (
				<span className="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
					{requestCount}
				</span>
			)}
		</div>
	);
};

InboxIcon.propTypes = {
	requestCount: PropTypes.number,
	guildId: PropTypes.string,
};

export default InboxIcon;
