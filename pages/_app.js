import '../styles/globals.css';
import '../styles/style.css';
import { Auth0Provider } from '@auth0/auth0-react';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<Auth0Provider
			clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
			domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}>
			<div className="bg-slate-700">{getLayout(<Component {...pageProps} />)}</div>
		</Auth0Provider>
	);
}

export default MyApp;
