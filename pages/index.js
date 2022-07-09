import React from 'react';
import ArticleCard from '../components/card/articleCard';
import axios from 'axios';
import Layout from '../components/layouts';
import FeaturedCard from '../components/card/featuredCard';
import { getProviders, useSession } from 'next-auth/react';
export async function getServerSideProps() {
	const providers = await getProviders();
	const res = await axios.get('https://dhanio-blog.herokuapp.com/api/article/');
	const { articles } = res.data;
	return {
		props: { articles, providers },
	};
}

export default function Home({ articles, providers }) {
	const { data: session } = useSession();
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
