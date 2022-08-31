import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import { db } from './'


export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {

    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()

    if (!product) return null
    //TODO: procesamiento de las imagenes cuando se suban al server
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

export const getAllProducts = async (): Promise<IProduct[]> => {

    await db.connect()
    const allProducts = await Product.find().lean()
    await db.disconnect()

    return JSON.parse(JSON.stringify(allProducts))
}