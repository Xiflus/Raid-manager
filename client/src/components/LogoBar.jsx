import { Link } from "react-router-dom";

const LogoBar = () => {
	return (
		<div className="">
			<Link to="/">
				<img className="h-16 w-16" src="/logoRaidManager.svg" alt="Logo de mi página" />
			</Link>
		</div>
	);
};

export default LogoBar;
