
import { useContext, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

import { Navigate } from 'react-router-dom';


const RegisterPage = () => {
	const { authUser, authRegister } = useContext(AuthContext);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatedPass, setRepeatedPass] = useState('');

	const handleRegister = (e) => {
		try {
			e.preventDefault();

			if (password !== repeatedPass) {
				throw new Error('Las contraseñas no coinciden');
            }
			authRegister(username, email, password);
		} catch (err) {
			toast.error(err.message);
		}
	};

	if (authUser) return <Navigate to='/'></Navigate>;

	return (
		<main className=''>
			<h2>Página de registro</h2>

			<form onSubmit={handleRegister}>
				<label htmlFor='username'>Usuario:</label>
				<input
					type='text'
					id='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>

				<label htmlFor='email'>Email:</label>
				<input
					type='text'
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<label htmlFor='pass'>Contraseña:</label>
				<input
					type='password'
					id='pass'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<label htmlFor='repeatedPass'>Repetir contraseña:</label>
				<input
					type='password'
					id='repeatedPass'
					value={repeatedPass}
					onChange={(e) => setRepeatedPass(e.target.value)}
					required
				/>
                <div>
				<button>Registrarse</button>
                </div>
			</form>
		</main>
	);
};

export default RegisterPage;
