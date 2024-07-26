import PropTypes from "prop-types";

const PageContainer = ({ children }) => {
    return (
        <div className="bg-black flex flex-col items-center justify-center flex-1 p-4 min-h-screen">
            {children}
        </div>
    );
};

PageContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PageContainer;
