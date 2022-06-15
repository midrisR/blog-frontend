import HandleError from './error';

export default function InputFile({ error, className, ...props }) {
	console.log(error ? 'true' : 'false');
	return (
		<div className={className + ' mb-4'}>
			<label className="block text-slate-700 text-sm font-bold mb-2 capitalize">
				{props.name}
			</label>
			<input
				type="file"
				className={`shadow block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-500 bg-white rounded overflow-hidden ocus:outline-none focus:shadow-outline ${
					error ? 'border border-red-500' : ''
				}`}
				{...props}
			/>
			<HandleError error={error} field={props.name} />
		</div>
	);
}
