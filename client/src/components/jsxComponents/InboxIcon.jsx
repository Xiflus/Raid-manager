import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const InboxIcon = ({ guildId, requestCount }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/guilds/${guildId}/join-requests`);
  };

  return (
    <div
      className="relative inline-block cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FontAwesomeIcon
        icon={isHovered ? faEnvelopeOpen : faEnvelope}
        size="2x"
        className="text-gray-400 group-hover:scale-110 transition-transform duration-200"
      />
      {requestCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
          {requestCount}
        </span>
      )}
      <div className="absolute hidden group-hover:block text-gray-400 text-xs  
 left-1/2 -translate-x-1/2 opacity-75 mt-1">
        Solicitudes
      </div>
    </div>
  );
};

InboxIcon.propTypes = {
  requestCount: PropTypes.number,
  guildId: PropTypes.string,
};

export default InboxIcon;
