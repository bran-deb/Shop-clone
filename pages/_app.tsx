import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from "next-auth/react"

import { UIProvider, CartProvider, AuthProvider } from '../context';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider>
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
    </SessionProvider>
  )
}

export default MyApp
