import Link from 'next/link';
import CouldinaryImage from '../cloudinary';
export default function FeaturedCard(props) {
	return (
		<div className="w-full">
			<Link href={`/${props.article.slug}`}>
				<a className="flex justify-center">
					<CouldinaryImage
						image={props.article.cover}
						width={1280}
						height={600}
						title={props.article.title}
					/>
				</a>
			</Link>
		</div>
	);
}
