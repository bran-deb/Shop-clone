import { db } from './'
import { Product } from '../models';
import { IProduct } from '../interfaces';


export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {

    db.connect()
    const product = await Product.findOne({ slug }).lean()
    db.disconnect()

    if (!product) return null
    return JSON.parse(JSON.stringify(product))
}


export interface ProductSlug {
    slug: string;
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {

    await db.connect()
    /* Returning an array of objects with the property `slug` and the value of the slug. */
    const slugs = await Product.find().select('slug -_id').lean()
    await db.disconnect()
    // return [{slug:''}]
    return slugs
}