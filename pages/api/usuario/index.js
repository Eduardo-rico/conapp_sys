import prisma from '../../../lib/prisma';

export default async function getAllUsers(req, res) {
	const users = await prisma.usuario.findMany();
	return res.json({ users, method: req.method });
}
