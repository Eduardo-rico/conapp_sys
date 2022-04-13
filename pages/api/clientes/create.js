import jwt from 'jsonwebtoken';

import prisma from '../../../lib/prisma';

const createUser = async (req, res) => {
	if (req.method == 'POST') {
		try {
			const userToken = req.headers.authorization?.split(' ')[1];
			const { username, id } = jwt.decode(userToken);
			if (!userToken) {
				return res.status(401).json({ error: 'No token in headers' });
			}
			const { nombre, rfc, email, usernameConagua, passConagua } = req.body;

			const cliente = await prisma.cliente.create({
				data: {
					nombre,
					rfc,
					email,
					usernameConagua,
					passConagua,
					usuarioId: id,
				},
			});
			return res.status(201).json({ cliente });
		} catch (error) {
			if (error.code === 'P2002') {
				return res.status(409).json({ error });
			}
			console.log(error);
			return res.status(500).json({ error });
		}
	}
	return res.status(401).json({ message: 'Método no válido' });
};

export default createUser;
