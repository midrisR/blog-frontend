import React from "react";

export default function Navbar() {
	return (
		<>
			{/* Navbar */}
			<nav className='fixed top-0 md:left-64 w-full z-10 bg-white shadow-lg md:flex-row md:flex-nowrap md:justify-start flex items-center p-4'>
				<div className='w-full mx-auto items-center flex justify-between flex-wrap md:px-10 px-4'>
					{/* Brand */}
					<a
						className='text-blue-500 text-sm uppercase hidden lg:inline-block font-semibold'
						href='#pablo'
						onClick={(e) => e.preventDefault()}>
						Dashboard
					</a>
					{/* Form */}
					<form className='md:flex hidden mr-64'>
						<div className='relative flex w-full flex-wrap items-stretch'>
							<span className='z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3'>
								<i className='fas fa-search'></i>
							</span>
							<input
								type='text'
								placeholder='Search here...'
								className='border-0 px-3 py-3 placeholder-blueGray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10'
							/>
						</div>
					</form>
				</div>
			</nav>
			{/* End Navbar */}
		</>
	);
}
