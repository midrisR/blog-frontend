import Navbar from '../navbar/navbar';
import Footer from '../footer';

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<div className="min-h-screen relative">
				<article>{children}</article>
				<Footer />
			</div>
		</>
	);
}
