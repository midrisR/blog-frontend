import '../styles/globals.css';
import '../styles/style.css';
import { SessionProvider } from 'next-auth/react';
export default function App({ Component, pageProps: { session, ...pageProps } }) {
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<SessionProvider session={session}>
			<div className="bg-slate-700">{getLayout(<Component {...pageProps} />)}</div>
		</SessionProvider>
	);
}
