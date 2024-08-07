import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { JoinRequestListService, validateMembersService } from "../../services/guildService";
import Button from "../components/jsxComponents/Button.jsx";

const RequestList = () => {
	const [requests, setRequests] = useState([]);
	const { guildId } = useParams();

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const res = await JoinRequestListService(guildId);
				const pendingRequests = res.requests.filter((request) => request.status === "pending");
				setRequests(pendingRequests);
			} catch (err) {
				toast.error("¡Error al cargar las solicitudes de ingreso!");
			}
		};
		fetchRequests();
	}, [guildId]);

	const handleAccept = async (requestId) => {
		try {
			await validateMembersService(guildId, requestId, "approved");
			toast.success("Solicitud aceptada");
			setRequests(requests.filter((request) => request.id !== requestId));
		} catch (err) {
			toast.error("¡Error al aceptar la solicitud!");
		}
	};

	const handleReject = async (requestId) => {
		try {
			await validateMembersService(guildId, requestId, "rejected");
			toast.success("Solicitud rechazada");
			setRequests(requests.filter((request) => request.id !== requestId));
		} catch (err) {
			toast.error("¡Error al rechazar la solicitud!");
		}
	};

	return (
		<div>
			<h1>Solicitudes de ingreso</h1>
			<ul>
				{requests.map((request) => (
					<li key={request.id}>
						<p>{request.character_name}</p>
						<p>{request.character_class}</p>
						<Button onClick={() => handleAccept(request.id)} text="Aceptar" />
						<Button onClick={() => handleReject(request.id)} text="Rechazar" />
					</li>
				))}
			</ul>
		</div>
	);
};

export default RequestList;
