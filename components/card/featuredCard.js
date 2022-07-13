import Link from 'next/link';
import CouldinaryImage from '../cloudinary';

export default function FeaturedCard({ articles }) {
	return (
		<div className="w-full mt-3">
			{articles.map((article, i) => (
				<Link key={i} href={`/${article.slug}`} prefetch={false}>
					<a className="flex justify-center">
						<div className="relative">
							<CouldinaryImage
								image={article.cover}
								width={1280}
								height={600}
								title={article.title}
								className="rounded-xl w-full"
							/>

							<span className="absolute uppercase text-2xl lg:text-4xl text-black bottom-5 lg:bottom-10 ml-6">
								{article.title}
							</span>
						</div>
					</a>
				</Link>
			))}
		</div>
	);
}
