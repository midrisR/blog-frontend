import Link from 'next/link';
import removeMd from 'remove-markdown';

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
								{/* <div className="w-full px-6 flex justify-between mt-4">
									<span className="text-xs text-gray-200 font-semibold">
										Author: {article.user.name}
									</span>
									<span className="text-xs text-gray-200 font-semibold">
										{newDate}
									</span>
								</div> */}
								<div className="px-6 py-4">
									<h1 className="text-md font-bold text-gray-200 uppercase">
										{article.title}
									</h1>
									<span className="text-xs text-gray-200">
										{plainText(article.content)}{' '}
										<Link href={`/${article.slug}`}>
											<a className="text-yellow-400 font-bold">read more</a>
										</Link>
									</span>
								</div>
							</a>
						</Link>
					</div>
				);
			})}
		</>
	);
}
