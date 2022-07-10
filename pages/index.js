import axios from 'axios';
import Layout from '../components/layouts';
import ArticleCard from '../components/card/articleCard';
import FeaturedCard from '../components/card/featuredCard';

export async function getServerSideProps() {
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
			<FeaturedCard articles={featured} />
			<div className="w-full flex flex-wrap justify-center px-8 my-4 md:my-20 gap-12 lg:gap-12">
				{list.map((article, i) => (
					<ArticleCard key={i} article={article} />
				))}
			</div>
		</>
	);
}
Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
