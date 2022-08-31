import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';

import { jwt, validations } from '@/utilities';
import { User } from '@/models'
import { db } from '@/database'

type Data =
    | { message: string }
    | {
        token: string;
        user: {
            email: string;
            role: string;
            name: string;
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return registerUser(req, res)
        default:
            res.status(400).json({ message: 'No valido' })
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = '' } = req.body as { name: string, email: string, password: string }

    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe de ser de 6 caracteres o mas' })
    }
    if (name.length < 2) {
        return res.status(400).json({ message: 'El nombre debe de ser de 2 caracteres' })
    }
    if (!validations.isValidEmail(email)) {
        return res.status(400).json({ message: `[${email}] no tiene formato de correo valido` })
    }


    await db.connect()
    const user = await User.findOne({ email })

    if (user) {
        await db.disconnect()
        return res.status(400).json({ message: 'Ese correo ya esta registrado' })
    }

    const newUser = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name,
    })

    try {
        await newUser.save({ validateBeforeSave: true })
        await db.disconnect()

    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }

    const { _id, role } = newUser
    const token = jwt.signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email,
            role,
            name,
        }
    })
}
