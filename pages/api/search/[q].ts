import type { NextApiRequest, NextApiResponse } from 'next'

import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import { db } from '@/database';

type Data =
    | { message: string }
    | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return searchProducts(req, res)
        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {

    let { q = '' } = req.query

    if (q.length === 0) {
        res.status(400).json({ message: 'debe de especificar el query de busqueda' })
    }

    q = q.toString().toLowerCase()

    await db.connect()
    /* Searching for products that match the query. */
    const searchedProducts = await Product
        .find({
            $text: {
                $search: q
            }
        })
        .select('title images price inStock slug -_id')
        .lean()
    await db.disconnect()

    return res.status(200).json(searchedProducts)
}
