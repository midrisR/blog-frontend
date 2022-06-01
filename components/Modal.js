import Image from "next/image";
export default function Modal({ showModal, setShowModal, children, images, loading, selectImage, loadMore }) {
	return (
		<>
			{showModal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-auto my-6 mx-auto max-w-3xl'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*body*/}
								<div
									className='w-full flex justify-end p-4 cursor-pointer'
									onClick={() => setShowModal(false)}>
									<span className='text-red-500 text-sm'>close</span>
								</div>
								<div className='relative p-6 flex-auto overflow-hidden'>
									{children}
									<div className={`my2 ${!loading && "h-96 overflow-y-scroll"}`}>
										<div className='flex flex-wrap p-4'>
											{images.map((image, i) => (
												<div key={i} className='w-1/4'>
													<Image
														src={image.urls.thumb}
														width='200'
														height='120'
														blurDataURL={image.blur_hash}
														alt={images.description}
														onClick={() => selectImage(image.urls.full)}
													/>
												</div>
											))}
											{images.length > 0 && (
												<div className='w-full flex justify-center'>
													<button
														className='px-3 py-2 mt-2 text-white bg-blue-500 rounded'
														onClick={loadMore}>
														Load more
													</button>
												</div>
											)}
										</div>
									</div>
								</div>
								{/*footer*/}
								<div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
									<button
										className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='button'
										onClick={() => setShowModal(false)}>
										Close
									</button>
									<button
										className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
										type='button'
										onClick={() => setShowModal(false)}>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
}
