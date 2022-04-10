import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Aside from '../../components/Aside';
import Card from '../../components/Card';

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
		console.log(clientes);
		setUsuarios(clientes);
	}, []);

	return (
		<div className="container flex">
			<Aside />
			<div className=" w-3/4 container flex justify-center">
				<div>
					<h2 className="text-3xl">Usuarios</h2>
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
