import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../../database'
import { Product } from '../../../../models'
import { IProduct } from '../../../../interfaces'


type Data = | { message: string } | IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {



    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res)
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { slug } = req.query

    await db.connect()
    /* Using the `findOne` method from the `Product` model to find a product by its slug. */
    const productBySlug = await Product.findOne({ slug }).lean()
    await db.disconnect()

    if (!productBySlug) {
        return res.status(400).json({
            message: 'Producto no encontrado'
        })
    }

    return res.json(
        productBySlug
    )


}
