import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { UIProvider } from '../context';
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
      <UIProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </SWRConfig>
  )
}

export default MyApp
