import axios from "axios";
import Link from "next/link";
import Admin from "../../../components/layouts/admin";

export async function getServerSideProps() {
	const res = await axios.get("http://localhost:5000/api/article/");
	const { articles } = res.data;
	return {
		props: { articles },
	};
}

export default function View({ articles }) {
	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='px-6 py-3'>
							title
						</th>
						<th scope='col' className='px-6 py-3'>
							author
						</th>
						<th scope='col' className='px-6 py-3'>
							created at
						</th>
						<th scope='col' className='px-6 py-3'>
							actions
						</th>
					</tr>
				</thead>
				<tbody>
					{articles.map((article, i) => {
						const date = new Date(article.created_at).toDateString(
							"id"
						);
						const newDate = date.split(" ").slice(1).join(" ");
						return (
							<tr key={i} className='bg-white border-b'>
								<td className='px-6 py-4 whitespace-nowrap'>
									{article.title}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{article.user.name}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{newDate}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<Link
										href={`/admin/article/edit/${article._id}`}>
										<a className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
											Edit
										</a>
									</Link>
									<button
										type='button'
										className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
										Red
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
View.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
