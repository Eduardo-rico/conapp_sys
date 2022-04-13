import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const NewClient = () => {
	const [userName, setUserName] = useState('');
	const [conaguaUser, setConaguaUser] = useState('');
	const [conaguaPass, setConaguaPass] = useState('');
	const [rfc, setRfc] = useState('');
	const [emailUser, setEmailUser] = useState('');
	const router = useRouter();

	useEffect(() => {
		const localToken = localStorage.getItem('token');
		if (!localToken) {
			console.log('no hay token');
			router.push('/');
		}
	}, []);

	async function submitForm(e) {
		e.preventDefault();
		const res = await fetch('/api/clientes/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				nombre: userName,
				usernameConagua: conaguaUser,
				passConagua: conaguaPass,
			}),
		});
		const resJson = await res.json();

		if (res.status == 201) {
			router.push('/plataforma/usuarios');
		} else {
			console.log('error al crear usuario');
			router.push('/plataforma/usuarios');
		}
	}

	return (
		<div>
			<form onSubmit={submitForm} className="rounded-md p-5 shadow-lg">
				<label className="block text-lg">Nombre</label>
				<input
					className="block mb-5 rounded-sm p-1 w-full"
					type="text"
					name="nombre"
					defaultValue={userName}
					onChange={(e) => setUserName(e.target.value)}
					placeholder="Juan Pérez"
				/>

				<label className="block text-lg">Usuario de Conagua</label>
				<input
					className="block mb-5 rounded-sm p-1 w-full"
					type="text"
					name="username"
					defaultValue={conaguaUser}
					onChange={(e) => setConaguaUser(e.target.value)}
					placeholder="CONAGUA ALGO"
				/>

				<label className="text-lg">Contraseña de conagua</label>
				<input
					className="block mb-5 rounded-sm p-1 w-full"
					type="text"
					name="password"
					placeholder="7867869786"
					defaultValue={conaguaPass}
					onChange={(e) => setConaguaPass(e.target.value)}
				/>

				<input
					type="submit"
					value="crear nuevo"
					className="w-full text-center text-lg text-white bg-indigo-500 rounded-md p-1 uppercase hover:bg-indigo-700 cursor-pointer transition-all"
				/>
			</form>
		</div>
	);
};

export default NewClient;
