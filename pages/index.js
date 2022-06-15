import ArticleCard from '../components/card/articleCard';
import axios from 'axios';
import Layout from '../components/layouts';
export async function getServerSideProps() {
	const res = await axios.get('http://localhost:5000/api/article/');
	const { articles } = res.data;
	return {
		props: { articles },
	};
}

export default function Home({ articles }) {
	return (
		<div className="w-full flex flex-wrap px-16 my-10 md:my-20 gap-16 md:gap-12">
			<ArticleCard articles={articles} />
		</div>
	);
}
Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
