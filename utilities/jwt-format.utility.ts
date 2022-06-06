import jwt from 'jsonwebtoken';

/**
 * It takes an _id and an email, and returns a signed JWT token.
 * The token is signed with a secret seed, which is stored in the .env file.
 * The token expires in 30 days.
 * @param {string} _id - The user's id
 * @param {string} email - string
 * @returns A token string
 */
export const signToken = (_id: string, email: string) => {

    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno')
    }

    return jwt.sign(
        //payload
        { _id, email },
        //seed
        process.env.JWT_SECRET_SEED,
        //options
        { expiresIn: '30d' }
    )
}