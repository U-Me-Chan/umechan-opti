import 'src/styles/variables.css'
import 'src/styles/globals.css'

import type { AppProps } from 'next/app';
import { theme } from 'src/theme';
import { ThemeProvider } from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
