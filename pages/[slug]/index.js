import { useState } from 'react';
import axios from 'axios';
import RenderMd from '../../components/Md';
import Layout from '../../components/layouts';
import { HiOutlineHeart, HiHeart, HiOutlineShare } from 'react-icons/hi';

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
	const [like, setLike] = useState(false);
	const handleLike = () => {
		setLike((like) => !like);
	};
	const date = new Date(article.created_at).toDateString('id');
	const convertDate = date.split(' ').slice(1).join(' ');
	return (
		<div className="w-full mx-auto md:max-w-5xl px-8 md:px-6">
			<div className="py-20 prose prose-pre:bg-slate-900 prose-a:text-yellow-600 prose-headings:text-gray-200 prose-ul:text-gray-200 prose-li:text-gray-200 prose-p:text-gray-300 md:prose-lg lg:prose-img:my-0 prose-img:my-0 max-w-none">
				<h1 className="text-gray-200 text-6xl font-black mb-10">{article.title} </h1>
				<img
					src={`http://localhost:5000/uploads/${article.cover}`}
					className="mb-5"
					alt={article.title}
				/>
				<RenderMd markdown={article.content} />
				<div className="like py-3 flex justify-between items-center gap-1">
					<div className="flex items-center gap-1 like">
						{like ? (
							<HiHeart
								color="#f87171"
								size={32}
								className="cursor-pointer"
								onClick={handleLike}
							/>
						) : (
							<HiOutlineHeart
								color="#e2e8f0"
								size={32}
								className="cursor-pointer"
								onClick={handleLike}
							/>
						)}
						<span className="text-slate-200">Like</span>
						<HiOutlineShare
							color="#e2e8f0"
							size={28}
							className="ml-12 cursor-pointer"
						/>
						<span className="text-slate-200">Share</span>
					</div>
					<div className="flex items-center gap-1 share">
						<img
							className="rounded-full w-8"
							src={`http://localhost:5000/uploads/user/${article.user.avatar}`}
							alt=""
						/>
						<span className="text-slate-200 ml-2">{article.user.name},</span>
						<span className="text-slate-200 ml-1">{convertDate}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

DetailArticle.getLayout = function getLayout(page) {
	return <Layout> {page} </Layout>;
};
