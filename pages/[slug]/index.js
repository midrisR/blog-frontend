import axios from 'axios';
import RenderMd from '../../components/Md';
import Layout from '../../components/layouts';

export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;
	const res = await axios.get(`http://localhost:5000/api/article/slug/${slug}`);
	const article = res.data;

	return {
		props: {
			article,
		},
	};
}

export default function DetailArticle({ article }) {
	return (
		<div className="w-full mx-auto md:max-w-5xl px-8 md:px-6">
			<div className="py-20 prose prose-pre:bg-slate-900 prose-a:text-yellow-600 prose-headings:text-gray-200 prose-ul:text-gray-200 prose-li:text-gray-200 prose-p:text-gray-300 md:prose-lg max-w-none">
				<h1 className="text-gray-200 text-6xl font-black mb-10">{article.title} </h1>
				<img
					src={`http://localhost:5000/uploads/${article.cover}`}
					className="mb-5"
					alt={article.title}
				/>
				<RenderMd markdown={article.content} />
			</div>
		</div>
	);
}

DetailArticle.getLayout = function getLayout(page) {
	return <Layout> {page} </Layout>;
};
