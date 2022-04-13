import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Aside from '../../../components/Aside';
import Card from '../../../components/Card';

const usuarios = () => {
	const [usuarios, setUsuarios] = useState([]);
	const router = useRouter();

	useEffect(async () => {
		const token = await localStorage.getItem('token');
		if (!token) {
			console.log('no hay token');
			router.push('/');
		}
		const requestUsers = await fetch('/api/clientes', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': `Bearer ${token}`,
			},
		});
		const { clientes } = await requestUsers.json();
		// console.log(clientes);
		setUsuarios(clientes);
	}, []);

	return (
		<div className="container flex">
			<Aside />
			<div className="container flex">
				<div className="w-auto">
					<h2 className="text-3xl">Usuarios</h2>
					<button
						className="bg-blue-200 rounded-md p-2"
						onClick={() => {
							router.push('/plataforma/usuarios/new');
						}}
					>
						Crear cliente
					</button>
					<div>
						{usuarios.map((cliente) => {
							return <Card key={cliente.id} cliente={cliente} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default usuarios;
