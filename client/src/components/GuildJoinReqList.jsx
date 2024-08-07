import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import InboxIcon from "./jsxComponents/InboxIcon.jsx";
import { JoinRequestListService } from "../../services/guildService";

const GuildJoinReqList = ({ guildId }) => {
	const [requestCount, setRequestCount] = useState(0);

	useEffect(() => {
		const fetchRequestCount = async () => {
			try {
				const res = await JoinRequestListService(guildId);
				console.log("GuildJoinReqList - res.req", res);

				setRequestCount(res.requests.lenght);
			} catch (err) {
				toast.error("¡Error al cargar las solicitudes de ingreso!");
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
