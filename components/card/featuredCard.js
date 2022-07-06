import Link from 'next/link';
export default function FeaturedCard(props) {
	return (
		<div className="w-full">
			<Link href={`/${props.article.slug}`}>
				<a className="flex justify-center">
					<img
						src={props.article.cover}
						alt={props.article.title}
						className="rounded-3xl"
						width={1280}
					/>
				</a>
			</Link>
		</div>
	);
}
