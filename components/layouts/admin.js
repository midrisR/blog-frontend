import Navbar from "../../components/navbar/adminNavbar";
import Sidebar from "../../components/sidebar/sidebar";

export default function Admin({ children }) {
	return (
		<>
			<Sidebar />
			<div className='relative md:ml-64 bg-blue-100'>
				<Navbar />
				<div className='px-4 md:px-10 mx-auto w-full -m-24'>
					<main className='  relative bg-blueGray-800 md:pt-32 pb-32 pt-12'>
						<div className='mt-24'>{children}</div>
					</main>
				</div>
			</div>
		</>
	);
}
