import mongoose, { Schema, model, Model } from 'mongoose'
import { IProduct } from '../interfaces'


/* Creating a schema for the product model. */
const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            message: '{VALUE} no es un tamaño valido'
        }
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: '' },
    type: {
        type: String,
        enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: '{VALUE} no es un tipo valido'
        },
        default: 'shirts'
    },
    gender: {
        type: String,
        enum: {
            values: ['men', 'women', 'kid', 'unisex'],
            message: '{VALUE} no es un genero valido'
        },
        default: 'women'
    }
}, {
    timestamps: true
})
/*NOTE: It's creating a text index for the title and tags fields. */
productSchema.index({ title: 'text', tags: 'text' })

/* Checking if the model already exists and if it does it uses it, if it doesn't it creates it. */
const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema)

export default Product