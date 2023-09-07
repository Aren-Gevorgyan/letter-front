import type { AppProps } from 'next/app';
import '../app/styles/globals.css';
import RootLayout from '@/app/layout';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<RootLayout>
			<Component {...pageProps} />
		</RootLayout>
	);
};

export default App;
