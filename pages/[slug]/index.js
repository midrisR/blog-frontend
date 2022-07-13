import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenderMd from '../../components/markdown/Md';
import Layout from '../../components/layouts';
import { HiOutlineShare } from 'react-icons/hi';
import Comment from '../../components/comment';
import { getProviders } from 'next-auth/react';
import ModalLogin from '../../components/modal/modalLogin';

export async function getServerSideProps(ctx) {
	const { slug } = ctx.query;
	const res = await axios.get(`https://dhanio-blog.herokuapp.com/api/article/slug/${slug}`);
	const article = res.data;
	return {
		props: {
			article,
		},
	};
}
export default function DetailArticle({ article }) {
	const [isOpen, setIsOpen] = useState(false);
	const [date, setDate] = useState('');
	const [providers, setProviders] = useState('');
	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
		})();
		const articleDate = new Date(article.created_at).toLocaleDateString();
		setDate(articleDate);
	}, []);

	return (
		<>
			<div className="w-full mx-auto md:max-w-5xl px-8 md:px-6">
				<div className="py-20 prose prose-pre:bg-slate-900 prose-a:text-yellow-600 prose-headings:text-black prose-ul:text-black prose-li:text-black prose-p:text-black md:prose-lg lg:prose-img:my-0 prose-img:my-0 max-w-none">
					<div className="mb-10">
						<h1 className="text-black text-6xl font-semibold mb-2">{article.title} </h1>
						<span className="text-sm text-black italic">Tag : {article.tag}</span>
					</div>

					<img src={article.cover} className="mb-5" alt={article.title} />
					<RenderMd markdown={article.content} />
					<div className="like py-3 flex justify-between items-center gap-1">
						<div className="flex items-center gap-2">
							<HiOutlineShare color="#000" size={28} className="cursor-pointer" />
							<span className="text-black">Share</span>
						</div>
						<div className="flex items-center gap-1 share">
							<img
								className="rounded-full w-8 h-8"
								src={article.user.avatar}
								alt={article.user.name}
							/>
							<span className="text-black ml-2">{article.user.name},</span>
							{date && <span className="text-black ml-1">{date}</span>}
						</div>
					</div>
					<Comment id={article._id} isOpen={isOpen} setIsOpen={setIsOpen} />
				</div>
			</div>
			<ModalLogin isOpen={isOpen} setIsOpen={setIsOpen} providers={providers} />
		</>
	);
}

DetailArticle.getLayout = function getLayout(page) {
	return <Layout> {page} </Layout>;
};
