import { ISize } from "./";

export interface ICartProduct {
    _id: string;
    images: string;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    gender: 'men' | 'women' | 'kid' | 'unisex'
    quantity: number;
}