import type { NextApiRequest, NextApiResponse } from 'next'

import bcrypt from 'bcryptjs';

import { db } from '../../../database'
import { User } from '../../../models'

type Data =
    | { message: string }
    | {
        token: string;
        user?: {
            email: string;
            role: string;
            name: string;
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return loginUser(req, res)

        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body

    await db.connect()
    const user = await User.findOne({ email })
    await db.disconnect()

    /* Checking if the user exists in the database. */
    if (!user) {
        return res.status(400).json({ message: 'Correo y contraseña no validos - EMAIL' })
    }
    /* Comparing the password that the user entered with the password that is stored in the database. */
    if (!bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({ message: 'Correo y contraseña no validos - PASSWORD' })
    }

    const { role, name } = user

    return res.status(200).json({
        token: '',//jwt
        user: { email, role, name, },
    })
}
