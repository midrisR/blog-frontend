import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
	const [offcavnas, setOffcanvas] = useState(false);
	const [search, setSearch] = useState(false);
	const handleCanvas = () => {
		setOffcanvas((canvas) => !canvas);
	};
	const handleSearch = () => {
		setSearch((search) => !search);
	};
	return (
		<nav className='sticky top-0 z-40 w-full bg-slate-900 flex-none transition-colors duration-500 lg:z-50  '>
			<div className='w-full container mx-auto bg-salte-900'>
				<div className='flex items-center px-10 lg:px-42 md:px-20 py-4'>
					<div className='w-3/12 md:hidden'>
						<button onClick={handleCanvas}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='white'
								strokeWidth='2'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>
					</div>
					<div className='md:w-2/12 w-6/12'>
						<Link href='/'>
							<a className='flex items-center justify-center md:justify-start text-gray-200 font-black'>
								BLOGGER
							</a>
						</Link>
					</div>
					<div className='w-3/12 md:hidden text-right'>
						<button onClick={handleSearch}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='white'
								strokeWidth='2'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</button>
					</div>
					<div
						className={`md:w-7/12 bg-slate-900 lg:bg-none w-full fixed md:static top-0 h-full md:h-auto p-10 md:p-0 transition-all ${
							offcavnas ? "left-0" : "-left-full"
						}`}>
						<button
							className='absolute top-10 right-10 md:hidden'
							onClick={handleCanvas}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='white'
								strokeWidth='2'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
						<ul className='flex flex-col mt-4 md:justify-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
							<li>
								<Link href='/posts'>
									<a className='block py-4 pr-2 pl-3 text-gray-200 md:bg-transparent md:p-0'>
										UI Design
									</a>
								</Link>
							</li>
							<li>
								<Link href='/posts'>
									<a className='block py-4 pr-2 pl-3 text-gray-200 md:bg-transparent md:p-0'>
										Front-End
									</a>
								</Link>
							</li>
							<li>
								<Link href='/posts'>
									<a className='block py-4 pr-2 pl-3 text-gray-200 md:bg-transparent md:p-0'>
										Back-End
									</a>
								</Link>
							</li>
						</ul>
					</div>
					<div
						className={`md:w-3/12 absolute md:static w-full left-0 px-10 md:px-0 transition-all ${
							search ? "top-10" : "-top-40"
						}`}>
						<div className='relative p-4 mt-4 rounded-lg md:p-0 md:mt-0 md:bg-none md:rounded-none'>
							<button
								className='absolute top-6 right-6 md:hidden focus:outline-none'
								onClick={handleSearch}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='black'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='feather feather-x'>
									<line x1='18' y1='6' x2='6' y2='18'></line>
									<line x1='6' y1='6' x2='18' y2='18'></line>
								</svg>
							</button>
							<input
								className='bg-white py-2 px-6 w-full text-blue-900 font-semibold md:rounded-xl rounded-lg focus:outline-none'
								placeholder='Search ...'
							/>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
