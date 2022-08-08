import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { UIProvider, CartProvider, AuthProvider } from '@/context';
import { lightTheme } from '@/themes';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '' }}>
        <SWRConfig
          // NOTE: provider de SWR
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            // refreshInterval: 3000,
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
