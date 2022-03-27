import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUser = async (req, res) => {
	const { username, password } = req.body;
	console.log(username);
	console.log(password);
	const hashedPassword = bcrypt.hashSync(password, 10);
	const user = await prisma.usuario.create({
		data: { username, password: hashedPassword },
	});
	res.json({ user });
};

export default createUser;
