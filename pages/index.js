import axios from 'axios';
import Layout from '../components/layouts';
import ArticleCard from '../components/card/articleCard';
import FeaturedCard from '../components/card/featuredCard';
import Head from 'next/head';
export async function getStaticProps() {
	const res = await axios.get('https://dhanio-blog.herokuapp.com/api/article/');
	const { articles } = res.data;
	return {
		props: { articles },
	};
}

export default function Home({ articles }) {
	const list = articles.filter((key) => !key.featured);
	const featured = articles.filter((key) => !!key.featured);
	return (
		<>
			<Head>
				<title>article</title>
			</Head>
			<div className="container px-20 mx-auto">
				<FeaturedCard articles={featured} />
				<div className="w-full my-4 md:my-20">
					{list.map((article, i) => (
						<ArticleCard key={i} article={article} />
					))}
				</div>
			</div>
		</>
	);
}

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
