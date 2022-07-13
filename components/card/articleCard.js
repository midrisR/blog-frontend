import Link from 'next/link';
import removeMd from 'remove-markdown';
import { useEffect, useState } from 'react';

export default function ArticleCard({ article }) {
	const [date, setDate] = useState('');
	const plainText = (data) => {
		const text = removeMd(data).slice(0, 200);
		return text;
	};
	useEffect(() => {
		const articleDate = new Date(article.created_at).toDateString();
		setDate(articleDate);
	}, []);

	return (
		<Link href={`/${article.slug}`} prefetch={false}>
			<a>
				<div className="w-full md:w-5/6 pl-0 lg:pl-14 lg:flex my-8">
					<div
						className="h-48 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l-xl text-center overflow-hidden"
						style={{
							backgroundImage: `url(${article.cover})`,
							backgroundPosition: 'center',
						}}
						title="Woman holding a mug"
					/>
					<div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r-xl p-4 flex flex-col justify-between leading-normal">
						<div className="mb-8">
							<div className="text-gray-900 font-bold text-xl mb-2">
								{article.title}
							</div>
							<p className="text-gray-700 text-base">
								{plainText(article.content)}...
								<span className="text-yellow-400 font-bold ml-1">read more</span>
							</p>
						</div>
						<div className="flex items-center">
							<img
								className="w-10 h-10 rounded-full mr-4"
								src={article.user.avatar}
								alt="Avatar of Jonathan Reinink"
							/>
							<div className="text-sm">
								<p className="text-gray-900 leading-none">{article.user.name}</p>
								<p className="text-gray-600">{date}</p>
							</div>
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
}
