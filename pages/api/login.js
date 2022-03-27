import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const KEY = '7868767896789689';

const login = async (req, res) => {
	if (!req.body) {
		(res.statusCode = 404), res.end('error');
		return;
	}
	const { username, password } = req.body;
	try {
		const dbUser = await prisma.usuario.findFirst({
			where: {
				username,
			},
		});

		if (!dbUser) {
			return res.json({
				message: 'No user or password matched',
			});
		}

		const passMatch = await bcrypt.compare(password, dbUser.password);
		console.log('fos');
		if (passMatch) {
			return res.json({
				token: jwt.sign(
					{
						username,
					},
					KEY
				),
			});
		}
		return res.json({
			message: 'No autorizado',
		});
	} catch (error) {
		console.log(error);
	}
};

export default login;
