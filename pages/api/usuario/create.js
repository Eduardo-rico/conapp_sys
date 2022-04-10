import * as bcrypt from 'bcrypt';

import prisma from '../../../lib/prisma';

const createUser = async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);
	try {
		const user = await prisma.usuario.create({
			data: { username, password: hashedPassword },
		});
		return res.json({ user });
	} catch (error) {
		if (error.code === 'P2002') {
			return res.status(409).json({ error });
		}
	}
};

export default createUser;
