import { isValidObjectId } from "mongoose";
import { IOrder, IOrderItem } from "@/interfaces";
import { Order } from "@/models";
import { db } from '.';


export const getOrderById = async (id: string): Promise<IOrder | null> => {

    if (!isValidObjectId(id)) return null

    await db.connect()
    const order = await Order.findById(id).lean()
    await db.disconnect()

    if (!order) return null

    /* Converting the mongoose object to a plain object. */
    return JSON.parse(JSON.stringify(order))
}

export const getOrderByUserId = async (userId: string): Promise<IOrderItem[]> => {

    if (!isValidObjectId(userId)) return []

    await db.connect()
    const orders = await Order.find({ user: userId }).lean()
    await db.disconnect()

    if (!orders) return []

    return JSON.parse(JSON.stringify(orders))
}