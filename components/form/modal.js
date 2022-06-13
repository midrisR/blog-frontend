export default function Modal({ show, children, onClose }) {
	return (
		<div className={`w-full ${show ? 'flex' : 'hidden'} justify-center absolute top-20 z-50`}>
			<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
				<div className="relative bg-slate-800 rounded-lg shadow-xl">
					<div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
						<h3 className="text-xl font-semibold text-slate-200">Terms of Service</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
							onClick={onClose}>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
							</svg>
						</button>
					</div>
					<div className="p-6">{children}</div>
				</div>
			</div>
		</div>
	);
}
