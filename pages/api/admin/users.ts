import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';

import { IUser } from '@/interfaces';
import { User } from '@/models'
import { db } from '@/database'

type Data =
    | { message: string }
    | IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getUsers(req, res)
        case 'PUT':
            return updateUsers(req, res)
        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()
    const users = await User.find().select('-password').lean()
    await db.disconnect()

    res.status(200).json(users)
}

const updateUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { userId = '', role = '' } = req.body
    const validRoles = ['admin', 'super-user', 'SEO', 'client']

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Bad request' })
    }

    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Rol no permitido: ' + validRoles.join(',') })
    }

    await db.connect()
    const user = await User.findById(userId)

    if (!user) {
        await db.disconnect()
        return res.status(404).json({ message: 'Usuario no encontrado: ' + userId })
    }

    user.role = role
    await user.save()
    await db.disconnect()

    res.status(200).json({ message: 'Usuario actualizado' + role })
}

