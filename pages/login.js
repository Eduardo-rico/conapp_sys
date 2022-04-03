import styled from 'styled-components';
import jwt from 'jsonwebtoken';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Div = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [message, setMessage] = useState('No estás logueado');

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
		const token = resJson.token;
		setToken(token);
		console.log(resJson);
		console.log(token);
		// if (token) {
		// 	const json = jwt.decode(token);
		// 	setMessage(`Bienvenido ${json.username}`);
		// } else {
		// 	setMessage(`Algo ocurrió mal o no estás registrado`);
		// }
	}

	return (
		<Div>
			<form onSubmit={submitForm}>
				<h1>{message}</h1>
				<input
					type="text"
					name="username"
					defaultValue={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<br />
				<input
					type="password"
					name="password"
					defaultValue={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<input type="submit" value="login" />
			</form>
		</Div>
	);
}
