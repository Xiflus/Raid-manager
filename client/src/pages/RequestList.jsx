import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
    JoinRequestListService,
    validateMembersService,
} from "../../services/guildService";
import Button from "../components/jsxComponents/Button.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";

const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const { guildId } = useParams();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await JoinRequestListService(guildId);
                const pendingRequests = res.requests.filter(
                    (request) => request.status === "pending"
                );
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
        <PageContainer>
            <FormContainer>
                <h1 className="text-xl font-bold text-gray-300 text-center mb-4">
                    Solicitudes de ingreso
                </h1>
                <ul className="space-y-4">
                    {requests.map((request) => (
                        <li
                            key={request.id}
                            className="bg-gray-600 p-4 rounded-lg w-full shadow-orange-semi-transparent  transition-transform duration-300 hover:scale-105"
                        >
                            <p className="text-lg text-white font-semibold">
                                usuario: {request.character_name}
                            </p>
                            <p className="text-sm text-gray-300">
                                personaje: {request.character_class}
                            </p>
                            <div className="flex space-x-2 mt-4">
                                <Button
                                    onClick={() => handleAccept(request.id)}
                                    text="Aceptar"
                                />
                                <Button
                                    onClick={() => handleReject(request.id)}
                                    text="Rechazar"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </FormContainer>
        </PageContainer>
    );
};

export default RequestList;
