import React from 'react';

const Card = ({ cliente }) => {
	return (
		<div className="max-w-xs rounded shadow-md">
			<div className="p-4">
				<div>
					<h2 className="text-xl font-bold text-gray-800">{cliente.nombre}</h2>
					<p className="text-gray-600">
						Usuario de Conagua:{cliente.usernameConagua}
					</p>
					<p className="text-gray-600">
						Contraseña de Conagua: {cliente.passConagua}
					</p>
					<p className="text-gray-600">RFC del usuario: {cliente.rfc}</p>
					<p className="text-gray-600">Correo del usuario: {cliente.email}</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
