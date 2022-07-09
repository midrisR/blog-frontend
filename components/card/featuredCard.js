import React from 'react';
import Link from 'next/link';
import CouldinaryImage from '../cloudinary';
export default function FeaturedCard({ articles }) {
	return (
		<div className="w-full mt-10">
			{articles.map((article, i) => (
				<Link key={i} href={`/${article.slug}`}>
					<a className="flex justify-center">
						<div className="relative">
							<CouldinaryImage
								image={article.cover}
								width={1280}
								height={600}
								title={article.title}
								className="rounded-xl"
							/>
							<span className="text-white text-4xl ml-4 font-semibold absolute bottom-10">
								{article.title}
							</span>
						</div>
					</a>
				</Link>
			))}
		</div>
	);
}
