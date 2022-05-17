import { db } from './'
import { Product } from '../models';
import { IProduct } from '../interfaces';


export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {

    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()

    if (!product) return null
    return JSON.parse(JSON.stringify(product))
}


interface ProductSlug {
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

export const getPropductsByTerm = async (term: string): Promise<IProduct[]> => {

    term = term.toString().toLowerCase()

    await db.connect()
    /* Searching for products that match the term. */
    const searchedProducts = await Product
        .find({
            $text: { $search: term }
        })
        .select('title images price inStock slug -_id')
        .lean()
    await db.disconnect()

    return searchedProducts
}