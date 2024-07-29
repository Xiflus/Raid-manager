import Select from "react-select";
import {Link} from "react-router-dom";

const NotCharacterComponent = () => {
    const option = [
        {value:"Crear personaje",
            label: <Link to="/characters/create">Crear Personaje</Link>
        }
    ]
  return (
    <div>
      <label
        htmlFor="characters"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Personajes
      </label>
      <Select options={option}/>
    </div>
  );
};

export default NotCharacterComponent;
