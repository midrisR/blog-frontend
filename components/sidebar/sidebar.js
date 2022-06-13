import { useState } from 'react';
import ActiveLink from '../activeLink';
import { List } from '../../components/menu/list';
import { HiOutlineChevronDown } from 'react-icons/hi';
export async function getServerSideProps(ctx) {
	console.log(ctx);
	return {
		props: {},
	};
}

export default function Sidebar() {
	const [collapseShow, setCollapseShow] = useState('hidden');
	return (
		<>
			<nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-50 py-4 px-6">
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					{/* Toggler */}
					<button
						className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
						type="button"
						onClick={() => setCollapseShow('bg-slate-800 m-2 py-3 px-6 shadow-xl')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-slate-200"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
					{/* Brand */}
					<ActiveLink activeClassName="text-purple-600" href="/">
						<a className="md:block text-left md:pb-2 text-purple-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-black p-4 px-0">
							Notus NextJS
						</a>
					</ActiveLink>
					{/* Collapse */}
					<div
						className={
							'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
							collapseShow
						}>
						{/* Collapse header */}
						<div className="md:min-w-full md:hidden block pb-4">
							<div className="flex flex-wrap">
								<div className="w-6/12">
									<ActiveLink activeClassName="text-purple-600" href="/">
										<a className="md:block text-left md:pb-2 text-purple-600 mr-0 inline-block whitespace-nowrap text-lg uppercase font-black p-4 px-0">
											Notus NextJS
										</a>
									</ActiveLink>
								</div>
								<div className="w-6/12 flex justify-end">
									<button
										type="button"
										className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
										onClick={() => setCollapseShow('hidden')}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6 text-slate-200"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
						{/* Form */}
						<form className="mt-6 mb-4 md:hidden">
							<div className="mb-3 pt-0">
								<input
									type="text"
									placeholder="Search"
									className="px-3 py-2 h-12 bg-white rounded-xl text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
								/>
							</div>
						</form>

						<div className="py-6 px-2 uppercase text-slate-700 text-opacity-50 text-sm">
							Apps and page
						</div>

						{List.map((menu, i) => (
							<div key={i} className="mb-3 text-slate-500 transition-all">
								<ActiveLink
									activeClassName="bg-purple-700 rounded-lg text-slate-200"
									href={menu.url}>
									<a className="flex gap-2  items-center px-4 py-1">
										{menu.icon}
										<span className="text-base p-1 no-underline">
											{menu.title}
										</span>
									</a>
								</ActiveLink>
							</div>
						))}
					</div>
				</div>
			</nav>
		</>
	);
}
