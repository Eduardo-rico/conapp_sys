import React from 'react';
import Aside from '../../components/Aside';
import Card from '../../components/Card';

const usuarios = () => {
	return (
		<div className="container flex">
			<Aside />
			<div className=" w-3/4 container flex justify-center">
				<div>
					<h2 className="text-3xl">Usuarios</h2>
					<div>
						<Card />
						<Card />
						<Card />
						<Card />
						<Card />
					</div>
					<Card />
				</div>
			</div>
		</div>
	);
};

export default usuarios;
