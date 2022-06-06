import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import RenderMd from "../../components/Md";
export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;
	const res = await axios.get(
		`http://localhost:5000/api/article/slug/${slug}`
	);
	const article = res.data;

	return {
		props: { article },
	};
}

export default function DetailArticle({ article }) {
	return (
		<>
			<Navbar />
			<div className='w-full mx-auto md:max-w-5xl'>
				<div className='py-20 prose md:prose-lg lg:prose-xl max-w-none'>
					<h1 className='text-black text-6xl font-black mb-10'>
						{article.title}
					</h1>
					<img
						src={`http://localhost:5000/uploads/${article.cover}`}
						className='mb-5'
						alt={article.title}
					/>
					<RenderMd markdown={article.content} />
				</div>
			</div>
		</>
	);
}
