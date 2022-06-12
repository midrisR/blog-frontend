export default function ({ type, ...props }) {
	console.log(props.color);
	return (
		<button
			className={`${
				props.className ? props.className : 'bg-blue-500 hover:bg-blue-700'
			}  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
			type={type}>
			{props.title}
		</button>
	);
}
