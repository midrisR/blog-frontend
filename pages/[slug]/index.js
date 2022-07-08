import { useEffect } from 'react';
import axios from 'axios';
import RenderMd from '../../components/markdown/Md';
import Layout from '../../components/layouts';
import { HiOutlineShare } from 'react-icons/hi';
import Comment from '../../components/comment';
import { useAuth0 } from '@auth0/auth0-react';

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
	const { isAuthenticated, user } = useAuth0();
	const date = new Date(article.created_at).toDateString('id');
	const convertDate = date.split(' ').slice(1).join(' ');
	let url = 'https://dhanio-blog.herokuapp.com/api/guest';

	useEffect(() => {
		async function createGuest() {
			try {
				await axios({
					method: 'post',
					url: url,
					data: {
						family_name: user.family_name,
						given_name: user.given_name,
						middle_name: user.middle_name,
						name: user.name,
						nickname: user.nickname,
						picture: user.picture,
						sub: user.sub,
						email_verified: user.email_verified,
					},
				});
			} catch (error) {
				console.log('error :', error);
			}
		}
		if (isAuthenticated) {
			createGuest();
		}
	}, [isAuthenticated]);

	return (
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
						<img className="rounded-full w-8 h-8" src={article.user.avatar} alt="" />
						<span className="text-slate-200 ml-2">{article.user.name},</span>
						<span className="text-slate-200 ml-1">{convertDate}</span>
					</div>
				</div>
				<Comment id={article._id} />
			</div>
		</div>
	);
}

DetailArticle.getLayout = function getLayout(page) {
	return <Layout> {page} </Layout>;
};
