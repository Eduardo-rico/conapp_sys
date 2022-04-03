import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

const signup = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [responseOk, setResponseOk] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (responseOk) {
			setMessage('');
			router.push('/');
		}
	}, [responseOk]);

	const submitForm = async (e) => {
		e.preventDefault();

		const res = await fetch('/api/usuario/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		});

		if (res.status === 200) {
			setResponseOk(true);
		} else if (res.status == 409) {
			setMessage('El usuario ya está en uso');
			setError(true);
		} else {
			setError(true);
		}
	};

	return (
		<Div>
			<h2 className="font-bold text-2xl p-3">Crea un usuario</h2>
			<form onSubmit={submitForm} className="rounded-md p-5 shadow-lg block">
				{error && (
					<div className="bg-red-800 text-center rounded-md p-2 uppercase mb-2 font-bold">
						<h2>Ha ocurrido un error: {message}</h2>
					</div>
				)}
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
					value="Crear usuario"
					className="w-full text-center text-lg text-white bg-indigo-500 rounded-md p-1 uppercase hover:bg-indigo-700 cursor-pointer transition-all"
				/>
			</form>
		</Div>
	);
};

export default signup;
