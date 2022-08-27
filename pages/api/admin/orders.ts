import type { NextApiRequest, NextApiResponse } from 'next'

import { IOrder } from '@/interfaces'
import { Order } from '@/models'
import { db } from '@/database'


type Data =
    | { message: string }
    | IOrder[]

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getOrders(req, res)
        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}


const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()
    const orders = await Order
        .find()
        .sort({ createdAt: 'desc' })
        .populate('user', 'name email')     /* get a reference to the USER field with the NAME and EMAIL fields. */
        .lean()
    await db.disconnect()

    return res.status(200).json(orders)
}
