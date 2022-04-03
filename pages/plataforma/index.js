import React from 'react';
import Aside from '../../components/Aside';

const index = () => {
	return (
		<div className="container flex">
			<Aside />
			<div className=" w-3/4 container flex justify-center">
				<h2 className="text-3xl">Dashboard</h2>
			</div>
		</div>
	);
};

export default index;
