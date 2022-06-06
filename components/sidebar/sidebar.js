import React from "react";
import Link from "next/link";
import ActiveLink from "../activeLink";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
	console.log(ctx);
	return {
		props: {},
	};
}

export default function Sidebar() {
	const [collapseShow, setCollapseShow] = React.useState("hidden");
	const router = useRouter();
	return (
		<>
			<nav className='md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-50 py-4 px-6'>
				<div className='md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto'>
					{/* Toggler */}
					<button
						className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
						type='button'
						onClick={() =>
							setCollapseShow("bg-white m-2 py-3 px-6")
						}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth='2'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4 6h16M4 12h16M4 18h16'
							/>
						</svg>
					</button>
					{/* Brand */}
					<ActiveLink activeClassName='active' href='/'>
						<a
							href='#pablo'
							className='md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'>
							Notus NextJS
						</a>
					</ActiveLink>

					{/* Collapse */}
					<div
						className={
							"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
							collapseShow
						}>
						{/* Collapse header */}
						<div className='md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200'>
							<div className='flex flex-wrap'>
								<div className='w-6/12'>
									<ActiveLink
										activeClassName='active'
										href='/'>
										<a
											href='#pablo'
											className='md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'>
											Notus NextJS
										</a>
									</ActiveLink>
								</div>
								<div className='w-6/12 flex justify-end'>
									<button
										type='button'
										className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
										onClick={() =>
											setCollapseShow("hidden")
										}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											strokeWidth='2'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
						{/* Form */}
						<form className='mt-6 mb-4 md:hidden'>
							<div className='mb-3 pt-0'>
								<input
									type='text'
									placeholder='Search'
									className='border-0 px-3 py-2 h-12  border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal'
								/>
							</div>
						</form>

						{/* Divider */}
						<hr className='my-4 md:min-w-full' />
						{/* Heading */}
						<h6 className='md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>
							Article
						</h6>
						{/* Navigation */}

						<ul className='md:flex-col md:min-w-full flex flex-col list-none'>
							<li className='items-center'>
								<ActiveLink
									activeClassName='text-blue-900'
									href='/admin/article'>
									<a className='text-xs uppercase py-3 font-bold block'>
										View Article
									</a>
								</ActiveLink>
							</li>

							<li className='items-center'>
								<ActiveLink
									activeClassName='text-blue-900'
									href='/admin/article/create'>
									<a className='text-xs uppercase py-3 font-bold block'>
										Create Article
									</a>
								</ActiveLink>
							</li>
							<hr className='my-4 md:min-w-full' />
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
