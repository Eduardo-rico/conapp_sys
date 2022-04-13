import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default function Home() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [message, setMessage] = useState('No estás logueado');

	const router = useRouter();

	useEffect(() => {
		const localToken = localStorage.getItem('token');
		if (localToken || token) {
			router.push('/plataforma');
		}
	}, []);

	async function submitForm(e) {
		e.preventDefault();
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});
		const resJson = await res.json();
		console.log(resJson);
		if (resJson.message) {
			setMessage(resJson.message);
		}
		const token = resJson.token;
		if (!token) {
			console.log('no token');
		} else {
			setToken(token);
			localStorage.setItem('token', token);
			router.push('/plataforma');
		}
		// if (token) {
		// 	const json = jwt.decode(token);
		// 	setMessage(`Bienvenido ${json.username}`);
		// } else {
		// 	setMessage(`Algo ocurrió mal o no estás registrado`);
		// }
	}

	return (
		<Div className="bg-slate-100 h-screen overflow-hidden">
			{message && <h3>{message}</h3>}
			<h2 className="font-bold text-2xl p-3">Inicia sesión</h2>
			<form onSubmit={submitForm} className="rounded-md p-5 shadow-lg">
				<label className="block text-lg">Username</label>
				<input
					className="block mb-5 rounded-sm p-1"
					type="text"
					name="username"
					defaultValue={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>

				<label className="text-lg">Contraseña</label>
				<input
					className="block mb-5 rounded-sm p-1"
					type="password"
					name="password"
					defaultValue={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<input
					type="submit"
					value="login"
					className="w-full text-center text-lg text-white bg-indigo-500 rounded-md p-1 uppercase hover:bg-indigo-700 cursor-pointer transition-all"
				/>
			</form>
		</Div>
	);
}
