import { Link } from "react-router-dom";

const LogoBar = () => {
	return (
		<div className="flex items-center">
			<Link to="/">
				<img className="h-20 w-20" src="/logoRaidManager.svg" alt="Logo de mi página" />
			</Link>
		</div>
	);
};

export default LogoBar;
