import Link from 'next/link';
import CouldinaryImage from '../cloudinary';
export default function FeaturedCard({ articles }) {
	return (
		<div className="w-full mt-10">
			{articles.map((article, i) => (
				<Link key={i} href={`/${article.slug}`}>
					<a className="flex justify-center">
						<CouldinaryImage
							image={article.cover}
							width={1280}
							height={600}
							title={article.title}
							className="rounded-xl"
						/>
					</a>
				</Link>
			))}
		</div>
	);
}
