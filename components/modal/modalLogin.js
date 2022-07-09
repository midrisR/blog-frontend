import React, { useCallback } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { signIn } from 'next-auth/react';

export default function ModalLogin({ isOpen, setIsOpen, providers }) {
	const handleModal = () => {
		setIsOpen((prev) => !prev);
	};

	const handleLogin = useCallback(() => {
		signIn(providers.id, {
			callbackUrl: typeof window !== 'undefined' && window.location.pathname,
		});
	}, []);

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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-center text-lg font-medium text-gray-900">
									Login With
								</Dialog.Title>
								<div className="mt-2">
									<div className="px-4 flex flex-col justify-center rounded-lg py-2">
										{Object.values(providers).map((provider, i) => (
											<div key={i} className="mt-4 mx-auto">
												<button
													type="button"
													className="w-48 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
													onClick={handleLogin}>
													Sign in with {provider.name}
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
