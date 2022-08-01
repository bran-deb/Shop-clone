import type { NextApiRequest, NextApiResponse } from 'next'

import { db, SHOP_CONSTANTS } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'

type Data =
    | { message: string }
    | IProduct[]
// | { products: IProduct[] }


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    //aplica filtros de consulta
    const { gender = 'all' } = req.query
    let condition = {}

    /* Checking if the gender is not equal to all and if the gender is included in the validGenders
    array. If it is, it sets the condition to the gender. */
    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = { gender }
    }

    await db.connect()
    /* Selecting the fields that we want to return to the client. */
    const products = await Product
        .find(condition)
        .select('title images price inStock slug -_id')
        .lean()
    await db.disconnect()

    return res.status(200).json(
        products
    )
}
