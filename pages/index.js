import Navbar from "../components/navbar/navbar";
import ArticleCard from "../components/card/articleCard";
import axios from "axios";

export async function getServerSideProps() {
	const res = await axios.get("http://localhost:5000/api/article/");
	const { articles } = res.data;
	console.log(articles);
	return {
		props: { articles },
	};
}

export default function Home({ articles }) {
	return (
		<>
			<Navbar />
			<div className='w-full flex flex-wrap px-16 mt-20 gap-4'>
				<ArticleCard articles={articles} />
			</div>
		</>
	);
}
