import prisma from '../../../lib/prisma';

export default async function getUserById(req, res) {
	const { id } = req.query; //url param
	const users = await prisma.usuario.findUnique();
	return res.json({ users, method: req.method });
}
