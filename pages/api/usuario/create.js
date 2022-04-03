import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUser = async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);
	try {
		const user = await prisma.usuario.create({
			data: { username, password: hashedPassword },
		});
		res.json({ user });
	} catch (error) {
		if (error.code === 'P2002') {
			res.status(409).json({ error });
		}
	}
};

export default createUser;
