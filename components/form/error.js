export default function HandleError(props) {
	const getFieldError = () => {
		return !!props.error;
	};
	const GetMessageError = () => {
		if (getFieldError(props.field)) {
			return <small className="text-red-500 text-xs italic">{props.error}</small>;
		}
	};
	return <GetMessageError />;
}
