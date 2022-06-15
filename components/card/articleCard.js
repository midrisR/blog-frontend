import Link from 'next/link';
import removeMd from 'remove-markdown';
import FeaturedCard from './featuredCard';
export default function ArticleCard({ articles }) {
	const plainText = (data) => {
		const text = removeMd(data).slice(0, 100);
		return text;
	};
	return (
		<>
			{articles.map((article, i) => {
				const date = new Date(article.created_at).toDateString('id');
				const newDate = date.split(' ').slice(1).join(' ');
				return (
					<>
						{article.featured ? (
							<FeaturedCard
								src={`http://localhost:5000/uploads/${article.cover}`}
								title={article.title}
							/>
						) : (
							<div
								key={i}
								className="bg-slate-800 relative w-1/5 h-80 overflow-hidden shadow rounded-xl">
								<Link href={`/${article.slug}`}>
									<a>
										<img
											className="w-full"
											src={`http://localhost:5000/uploads/${article.cover}`}
											alt="Sunset in the mountains"
										/>

										<div className="px-6 py-4">
											<h1 className="text-md font-bold text-gray-200 uppercase">
												{article.title}
											</h1>
											<span className="text-xs text-gray-200">
												{plainText(article.content)}{' '}
												<span className="text-yellow-400 font-bold">
													read more
												</span>
											</span>
										</div>
									</a>
								</Link>
							</div>
						)}
					</>
				);
			})}
		</>
	);
}
