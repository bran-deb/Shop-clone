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
    /* Creating a token. */
    return jwt.sign(
        //payload
        { _id, email },
        //seed
        process.env.JWT_SECRET_SEED,
        //options
        { expiresIn: '30d' }
    )
}



/**
 * It takes a token as a parameter, verifies it, and returns the user's id if the token is valid
 * @param {string} token - string
 * @returns A promise that resolves to a string.
 */
export const isValidToken = (token: string): Promise<string> => {

    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno')
    }

    return new Promise((resolve, reject) => {

        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {

                if (err) return reject('JWT no es valido')

                const { _id } = payload as { _id: string }

                resolve(_id)
            })

        } catch (error) {
            return reject('JWT no es valido')
        }
    })
}