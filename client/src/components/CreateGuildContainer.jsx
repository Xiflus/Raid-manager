import PropTypes from "prop-types";
import PageContainer from "./PageContainer.jsx";
import FormContainer from "./FormContainer.jsx";
import Heading from "./Heading.jsx";

const CreateGuildContainer = ({ children, title }) => {
    return (
        <PageContainer>
            <FormContainer>
                <Heading
                    level={2}
                    className="text-white text-2xl font-bold mb-6 text-center"
                >
                    {title}
                </Heading>
                {children}
            </FormContainer>
        </PageContainer>
    );
};

CreateGuildContainer.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default CreateGuildContainer;
