import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAllUsers(req, res) {
	const users = await prisma.usuario.findMany();
	return res.json({ users, method: req.method });
}
