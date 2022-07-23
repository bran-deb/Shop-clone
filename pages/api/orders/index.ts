import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces';

type Data =
    | { message: string }
    | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}



const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const body = req.body;



    return res.status(201).json(body)
}
