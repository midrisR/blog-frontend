import React, { useState } from 'react';
import axios from 'axios';
import RenderMd from '../../components/markdown/Md';
import Layout from '../../components/layouts';
import { HiOutlineShare } from 'react-icons/hi';
import Comment from '../../components/comment';
import { getProviders } from 'next-auth/react';
import ModalLogin from '../../components/modal/modalLogin';

export async function getStaticProps({ params }) {
	const providers = await getProviders();
	const res = await axios.get(
		`https://dhanio-blog.herokuapp.com/api/article/slug/${params.slug}`
	);
	const article = res.data;
	return {
		props: {
			article,
			providers,
		},
	};
}

export async function getStaticPaths() {
	const res = await axios.get('https://dhanio-blog.herokuapp.com/api/article');
	const paths = res.data.articles.map((article) => ({
		params: { slug: article.slug },
	}));
	return { paths, fallback: 'blocking' };
}

export default function DetailArticle({ article, providers }) {
	const [isOpen, setIsOpen] = useState(false);
	const date = new Date(article.created_at).toDateString('id');
	const convertDate = date.split(' ').slice(1).join(' ');
	if (!article) return <h1 className="text-white">Loading</h1>;
	return (
		<>
			<div className="w-full mx-auto md:max-w-5xl px-8 md:px-6">
				<div className="py-20 prose prose-pre:bg-slate-900 prose-a:text-yellow-600 prose-headings:text-gray-200 prose-ul:text-gray-200 prose-li:text-gray-200 prose-p:text-gray-300 md:prose-lg lg:prose-img:my-0 prose-img:my-0 max-w-none">
					<div className="mb-10">
						<h1 className="text-gray-200 text-6xl font-black mb-2">{article.title} </h1>
						<span className="text-sm text-slate-200 italic">Tag : {article.tag}</span>
					</div>

					<img src={article.cover} className="mb-5" alt={article.title} />
					<RenderMd markdown={article.content} />
					<div className="like py-3 flex justify-between items-center gap-1">
						<div className="flex items-center gap-2">
							<HiOutlineShare color="#e2e8f0" size={28} className="cursor-pointer" />
							<span className="text-slate-200">Share</span>
						</div>
						<div className="flex items-center gap-1 share">
							<img
								className="rounded-full w-8 h-8"
								src={article.user.avatar}
								alt=""
							/>
							<span className="text-slate-200 ml-2">{article.user.name},</span>
							<span className="text-slate-200 ml-1">{convertDate}</span>
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
