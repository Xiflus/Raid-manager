/* eslint-disable react/prop-types */
import { useState } from "react";

const CharacterSelection = ({ character }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);
	return (
		<div>
			<button onClick={handleOpen}>Select Character</button>
			{open ? (
				<div>
					<li key={character.id}>
						<p>{character.name}</p>
						<p>{character.class}</p>
						<p>{character.avatar}</p>
					</li>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};
export default CharacterSelection;
