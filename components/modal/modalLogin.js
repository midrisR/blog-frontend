import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { signIn } from 'next-auth/react';

export default function ModalLogin({ isOpen, setIsOpen, providers }) {
	const handleModal = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={handleModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<div className="flex justify-center mb-5">
									<img src="/next-auth.png" alt="" width={150} />
								</div>
								<Dialog.Title
									as="h3"
									className="text-center text-lg text-gray-500 font-bold">
									Authentication for Next.js
								</Dialog.Title>
								<div className="mt-2">
									<div className="px-4 flex flex-col justify-center rounded-lg py-2">
										{Object.values(providers).map((provider, i) => (
											<div key={i} className="mt-4 mx-auto">
												<button
													type="button"
													className="w-64 text-gray-900 relative bg-gray-100 hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
													onClick={() => signIn(provider.id)}>
													<img
														src={`/${provider.name}.svg`}
														className="w-6 absolute left-0 ml-3"
													/>
													<span className="ml-10">
														Sign in with {provider.name}
													</span>
												</button>
											</div>
										))}
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
