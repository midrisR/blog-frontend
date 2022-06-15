import HandleError from './error';

export default function Textarea({ error, ...props }) {
	return (
		<div className="mb-2 px-2">
			<label className="block text-slate-700 text-sm font-bold mb-2 capitalize">
				{props.name}
			</label>
			<textarea
				className={`shadow appearance-none border rounded w-full pt-3 px-3 text-gray-700 leading-tight focus:outline-none placeholder-slate-700 placeholder-opacity-50 focus:shadow-outline placeholder:text-sm placeholder:italic ${
					error ? 'border-red-500' : ''
				}`}
				cols="20"
				{...props}
			/>
			<HandleError error={error} field={props.name} />
		</div>
	);
}
