import HandleError from './error';

export default function SwitchToggle({ error, className, ...props }) {
	return (
		<div className="flex items-center">
			<label className="block text-slate-700 text-sm font-bold mb-2 mr-3 capitalize">
				{props.name}
			</label>
			<div className="form-check form-switch">
				<label className="inline-flex relative items-center cursor-pointer">
					<input type="checkbox" name={props.name} className="sr-only peer" {...props} />
					<div className="w-11 h-6 bg-slate-200 shadow-lg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-green-800 after:content-[''] after:absolute  after:bg-green-500 after:border-green-300 after:border after:rounded-full after:h-6 after:w-6  peer-checked:bg-slate-900 after:transition-all"></div>
				</label>
			</div>
			<HandleError error={error?.[props.name]} field={props.name} />
		</div>
	);
}
