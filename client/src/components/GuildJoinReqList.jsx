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
		<div className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors mb-4 block text-center flex items-center justify-center">
      <InboxIcon guildId={guildId} requestCount={requestCount} className="text-gray-500" />
      <span className="text-white ml-2">Solicitudes de hermandad</span>
    </div>
	);
};

GuildJoinReqList.propTypes = {
	guildId: PropTypes.string,
};

export default GuildJoinReqList;
