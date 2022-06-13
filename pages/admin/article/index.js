import axios from 'axios';
import Link from 'next/link';
import Admin from '../../../components/layouts/admin';
import { authPageAdmin } from '../../../middleware/auth';

export async function getServerSideProps(ctx) {
	await authPageAdmin(ctx);
	const res = await axios.get('http://localhost:5000/api/article/');
	const { articles } = res.data;
	return {
		props: { articles },
	};
}

export default function View({ articles }) {
	return (
		<div className="relative">
			<div className="mb-5">
				<Link href="/admin/article/create" className="mb-20">
					<a className="px-4 py-2 mb-3 bg-purple-700 text-slate-200 rounded-xl focus:outline-none">
						Create Article
					</a>
				</Link>
			</div>
			<div className="overflow-hidden rounded-xl">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								title
							</th>
							<th scope="col" className="px-6 py-3">
								author
							</th>
							<th scope="col" className="px-6 py-3">
								active
							</th>
							<th scope="col" className="px-6 py-3">
								featured
							</th>
							<th scope="col" className="px-6 py-3">
								created at
							</th>
							<th scope="col" className="px-6 py-3">
								actions
							</th>
						</tr>
					</thead>
					<tbody>
						{articles.map((article, i) => {
							const date = new Date(article.created_at).toDateString('id');
							const newDate = date.split(' ').slice(1).join(' ');
							return (
								<tr key={i} className="bg-white border-b">
									<td className="px-6 py-4 whitespace-nowrap">{article.title}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{article.user.name}
									</td>
									<td
										className={`px-6 py-4 font-bold whitespace-nowrap ${
											article.active ? 'text-green-700' : 'text-red-500'
										}`}>
										{new Boolean(article.active).toString()}
									</td>
									<td
										className={`px-6 py-4 whitespace-nowrap font-bold ${
											article.featured ? 'text-green-700' : 'text-red-500'
										}`}>
										{new Boolean(article.featured).toString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">{newDate}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<Link href={`/admin/article/edit/${article._id}`}>
											<a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
												Edit
											</a>
										</Link>
										<button
											type="button"
											className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
											Red
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
View.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
