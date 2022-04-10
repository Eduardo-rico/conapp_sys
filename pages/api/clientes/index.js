import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

export default async function getAllClientes(req, res) {
	const usuarioCuid = req.headers.authorization?.split(' ')[1];
	if (!usuarioCuid) {
		return res.status(400).json({ error: 'no hay token?' });
	}
	const { id } = jwt.decode(usuarioCuid);
	try {
		const clientes = await prisma.cliente.findMany({
			where: {
				usuarioId: id,
			},
		});
		return res.json({ clientes });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ error });
	}
}
