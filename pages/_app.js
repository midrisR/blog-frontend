import "../styles/globals.css";
import "../styles/style.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className='bg-slate-900 min-h-screen'>
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
