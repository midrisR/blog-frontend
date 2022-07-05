import React from 'react';
import ArticleCard from '../components/card/articleCard';
import axios from 'axios';
import Layout from '../components/layouts';
import FeaturedCard from '../components/card/featuredCard';
export async function getServerSideProps() {
	const res = await axios.get('http://localhost:5000/api/article/');
	const { articles } = res.data;
	return {
		props: { articles },
	};
}

export default function Home({ articles }) {
	return (
		<div className="w-full flex flex-wrap justify-center px-8 my-4 md:my-20 gap-12 lg:gap-12">
			{articles.map((article, i) => (
				<React.Fragment key={i}>
					{article.featured ? (
						<FeaturedCard article={article} />
					) : (
						<ArticleCard article={article} />
					)}
				</React.Fragment>
			))}
		</div>
	);
}
Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
