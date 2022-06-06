import Link from "next/link";
export default function ArticleCard({ articles }) {
	return (
		<>
			{articles.map((article, i) => {
				const date = new Date(article.created_at).toDateString("id");
				const newDate = date.split(" ").slice(1).join(" ");
				return (
					<div key={i} className='w-1/5'>
						<Link href={`/${article.slug}`}>
							<a>
								<div className='overflow-hidden shadow-lg rounded-xl'>
									<img
										className='w-full'
										src={`http://localhost:5000/uploads/${article.cover}`}
										alt='Sunset in the mountains'
									/>
									<div className='px-6 py-4'>
										<h1 className='text-2xl font-bold text-blue-900 uppercase'>
											{article.title}
										</h1>
									</div>
									<div className='px-6 mb-4 flex justify-between'>
										<span className='text-xs text-blue-900 font-semibold'>
											Author: {article.user.name}
										</span>
										<span className='text-xs text-blue-900 font-semibold'>
											{newDate}
										</span>
									</div>
								</div>
							</a>
						</Link>
					</div>
				);
			})}
		</>
	);
}
