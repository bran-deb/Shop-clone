import bcrypt from 'bcryptjs';
import { User } from "@/models"
import { db } from "."



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



//Esta funcion crea o verifica el usuario de OAuth
export const oAuthToDBUser = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect()
    const user = await User.findOne({ email: oAuthEmail })

    if (user) {
        await db.disconnect()
        const { _id, name, email, role } = user
        return { _id, name, email, role }
    }
    const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client' })
    await newUser.save()
    await db.disconnect()

    const { _id, name, email, role } = newUser
    return { _id, name, email, role }
}