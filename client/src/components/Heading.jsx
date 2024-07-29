import PropTypes from "prop-types";

const Heading = ({ level, children, className, ...props }) => {
    const Tag = `h${level}`;
    return (
        <Tag className={className} {...props}>
            {children}
        </Tag>
    );
};

Heading.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Heading.defaultProps = {
    className: "",
};

export default Heading;
