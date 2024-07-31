import EditGuildForm from "../components/forms/EditGuildForm.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";
import Heading from "../components/Heading.jsx";

const EditGuildPage = () => {
	return (
		<PageContainer>
			<FormContainer>
				<Heading level={2} className="text-white text-2xl font-bold mb-6 text-center">
					Modificación de Hermandad
				</Heading>
				<EditGuildForm />
			</FormContainer>
		</PageContainer>
	);
};

export default EditGuildPage;
