import Link from 'next/link';
import removeMd from 'remove-markdown';
export default function ArticleCard({ article }) {
	const plainText = (data) => {
		const text = removeMd(data).slice(0, 100);
		return text;
	};
	const DateTime = ({ time }) => {
		const date = new Date(time).toDateString('id');
		const newDate = date.split(' ').slice(1).join(' ');
		return <span className="text-xs text-gray-200 italic">{newDate}</span>;
	};
	return (
		<div className="bg-slate-800 w-full flex items-center lg:block transform transition-all lg:w-1/5 relative overflow-hidden shadow rounded-xl">
			<Link href={`/${article.slug}`}>
				<a className="w-full flex flex-col lg:block">
					<img
						className="hidden lg:block w-full"
						src={`http://localhost:5000/uploads/${article.cover}`}
						alt="Sunset in the mountains"
					/>
					<div className="flex items-center gap-3 lg:hidden p-4">
						<img
							className="w-10 h-10 rounded-full"
							src={`http://localhost:5000/uploads/user/${article.user.avatar}`}
							alt="Sunset in the mountains"
						/>
						<div className="div">
							<p className="text-slate-200 text-sm">{article.user.name}</p>
							<DateTime time={article.created_at} />
						</div>
					</div>
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
