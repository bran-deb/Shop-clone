

/**
 * It checks if the email is valid by checking if it matches the regex pattern
 * @param {string} email - string - The email address to validate
 * @returns A boolean value.
 */
export const isValidEmail = (email: string): boolean => {

    const match = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    return !!match;
}


/**
 * The above function is a validator function. It's a function that returns a string if the input is
 * invalid, and undefined if the input is valid.
 * @param {string} email - string - The email address to validate
 * @returns A function that takes a string and returns a string or undefined.
 */
export const isEmail = (email: string): string | undefined => {

    return isValidEmail(email)
        ? undefined
        : 'El correo no parece ser válido';
}
