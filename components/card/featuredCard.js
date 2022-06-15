export default function FeaturedCard(props) {
	return (
		<div className="w-full">
			<img src={props.src} alt={props.title} className="rounded-2xl" />
		</div>
	);
}
