import { FC } from "react";
import Head from "next/head";

import { Navbar, SideMenu } from "@/components/ui";


interface Props {
    title: string
    pageDescription: string
    imageFullUrl?: string
    children?: JSX.Element | JSX.Element[]
    //NOTE: types children in React 18
    // children?: ReactChild | ReactChild[]
    // children?: ReactNode
}


export const ShopLayout: FC<Props> = ({ title, pageDescription, imageFullUrl, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                {/* metatags open graph */}
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                {
                    imageFullUrl && (
                        <meta name="og:image" content={imageFullUrl} />
                    )
                }
            </Head>

            <nav>
                <Navbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                {children}
            </main>

            <footer>
                {/* TODO: mi custom footer */}
            </footer>
        </>
    )
};
