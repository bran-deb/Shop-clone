import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { UIProvider, CartProvider } from '../context';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    // NOTE: provider de SWR
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        // refreshInterval: 3000,
      }}
    >
      <CartProvider>
        <UIProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </CartProvider>
    </SWRConfig>
  )
}

export default MyApp
