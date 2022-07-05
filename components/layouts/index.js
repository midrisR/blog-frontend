import Navbar from '../navbar/navbar';
import Footer from '../footer';

export default function Layout({ children }) {
	return (
		<div className="bg-slate-700">
			<Navbar />
			<article>{children}</article>
			<Footer />
		</div>
	);
}
