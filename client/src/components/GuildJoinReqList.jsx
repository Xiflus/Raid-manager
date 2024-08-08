import { useState, useEffect } from "react";
import { showToast } from "../utils/toast.jsx";
import PropTypes from "prop-types";
import InboxIcon from "./jsxComponents/InboxIcon.jsx";
import { JoinRequestListService } from "../../services/guildService";

const GuildJoinReqList = ({ guildId }) => {
	const [requestCount, setRequestCount] = useState(0);

	useEffect(() => {
		const fetchRequestCount = async () => {
			try {
				const res = await JoinRequestListService(guildId);

				setRequestCount(res.requests.lenght);
			} catch (err) {
				showToast("¡Error al cargar las solicitudes de ingreso!", "error");
			}
		};
		fetchRequestCount();
	}, [guildId]);
	return (
		<div>
      <InboxIcon guildId={guildId} requestCount={requestCount} />
    </div>
	);
};

GuildJoinReqList.propTypes = {
	guildId: PropTypes.string,
};

export default GuildJoinReqList;
