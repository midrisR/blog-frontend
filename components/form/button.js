export default function ({ type, ...props }) {
	return (
		<button
			className={`${
				props.className ? props.className : 'bg-blue-500 hover:bg-blue-700'
			}  text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline`}
			type={type}
			{...props}>
			{props.title}
		</button>
	);
}
