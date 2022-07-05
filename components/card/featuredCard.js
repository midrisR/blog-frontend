import Link from 'next/link';
export default function FeaturedCard(props) {
	return (
		<div className="w-full">
			<Link href={`/${props.article.slug}`}>
				<a className="flex justify-center">
					<img
						src={`http://localhost:5000/uploads/${props.article.cover}`}
						alt={props.article.title}
						className="rounded-3xl"
					/>
				</a>
			</Link>
		</div>
	);
}
