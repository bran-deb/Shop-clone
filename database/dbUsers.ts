import { db } from "."
import { User } from "../models"
import bcrypt from 'bcryptjs';



/**
 * This function checks if the user exists in the database and if the password is correct, if so, it
 * returns the user's information.
 * @param {string} email - string, password: string
 * @param {string} password - string
 */
export const checkUserEmailPassword = async (email: string, password: string) => {

    await db.connect()
    const user = await User.findOne({ email }).lean()
    await db.disconnect()

    if (!user) {
        return null
    }
    if (!bcrypt.compareSync(password, user.password!)) {
        return null
    }
    const { role, name, _id } = user

    return {
        _id,
        email: email.toLowerCase(),
        role,
        name,
    }
}