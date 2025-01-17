import type { AppProps } from 'next/app';
import 'assets/common.css';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
