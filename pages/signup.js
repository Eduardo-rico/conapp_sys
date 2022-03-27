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

const signup = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submitForm = async (e) => {
		e.preventDefault();

		const res = await fetch('/api/usuario/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		});

		console.log(res);
	};

	return (
		<Div>
			<form onSubmit={submitForm}>
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
				<input type="submit" value="Crear usuario" />
			</form>
		</Div>
	);
};

export default signup;
