import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import removeMd from 'remove-markdown';
import CouldinaryImage from '../cloudinary';
export default function ArticleCard({ article }) {
	const plainText = (data) => {
		const text = removeMd(data).slice(0, 100);
		return text;
	};
	return (
		<div className="bg-slate-800 w-full flex items-center lg:block transform transition-all md:w-1/2 lg:w-1/5 relative overflow-hidden shadow rounded-xl">
			<Link href={`/${article.slug}`} prefetch={false}>
				<a className="w-full flex flex-col lg:block">
					<CouldinaryImage
						image={article.cover}
						width={400}
						height={250}
						title={article.title}
					/>

					<div className="w-full px-6 lg:py-3 py-1">
						<h1 className="text-xl font-bold text-gray-200 uppercase">
							{article.title}
						</h1>
						<div className="py-4">
							<span className="text-xs text-gray-200 hidden lg:block">
								{plainText(article.content)}...
								<span className="text-yellow-400 font-bold ml-1">read more</span>
							</span>
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
}
