export default function Form({ children, onSubmit, error }) {
	const NofifError = () => {
		return (
			<div className="bg-red-500 bg-opacity-20 px-4 py-2 rounded-md text-red-800 text-center font-semibold mb-3">
				{error}
			</div>
		);
	};
	return (
		<>
			<form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
				{typeof error === 'string' ? <NofifError /> : ''}
				{children}
			</form>
		</>
	);
}
