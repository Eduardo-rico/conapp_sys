import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function getAllClientes(req, res) {
	const usuarioCuid = req.headers.authorization?.split(' ')[1];
	const { username } = jwt.decode(usuarioCuid);
	console.log(username);
	if (!usuarioCuid) {
		return res.status(401).json({ error: 'No token in headers' });
	}
	try {
		const clientes = await prisma.cliente.findMany({
			where: {
				usuarioId: username,
			},
		});
		return res.json({ clientes });
	} catch (error) {
		console.log(error);
	}
}
