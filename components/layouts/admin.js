import Navbar from '../../components/navbar/adminNavbar';
import Sidebar from '../../components/sidebar/sidebar';

export default function Admin({ children }) {
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-slate-900">
				<Navbar />
				<div className="px-4 md:px-10 mx-auto w-full min-h-screen">
					<main className="  relative bg-blueGray-800 md:pt-32 pt-12">{children}</main>
				</div>
			</div>
		</>
	);
}
