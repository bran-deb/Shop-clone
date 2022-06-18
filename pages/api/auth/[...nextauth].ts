import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'



export default NextAuth({
    // Configure one or more authentication providers
    providers: [

        Credentials({
            name: 'Custom Login',
            credentials: {
                email: {
                    label: 'Correo:',
                    type: 'email',
                    placeholder: 'correo@google.com'
                },
                password: {
                    label: 'Contraseña:',
                    type: 'password',
                    placeholder: 'Contraseña'
                }
            },
            async authorize(credentials) {
                console.log({ credentials });
                //TODO: validar contra base de datos

                return { name: 'Juan', correo: 'juan@google.com', role: 'admin' }
            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],

    //callbacks
    callbacks: {

    }

})