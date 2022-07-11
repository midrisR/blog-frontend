import Link from 'next/link';
import CouldinaryImage from '../cloudinary';
export default function FeaturedCard({ articles }) {
	return (
		<div className="w-full mt-10 scroll-px-48">
			{articles.map((article, i) => (
				<Link key={i} href={`/${article.slug}`} prefetch={false}>
					<a className="flex justify-center">
						<div className="relative">
							<CouldinaryImage
								image={article.cover}
								width={1280}
								height={600}
								title={article.title}
								className="rounded-xl"
							/>
							<span className="absolute font-bold text-2xl lg:text-4xl text-white bottom-5 lg:bottom-10 ml-6">
								{article.title}
							</span>
						</div>
					</a>
				</Link>
			))}
		</div>
	);
}
