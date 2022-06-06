import Markdown from "../../../../components/MarkdownEditor";
import { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../../../../components/layouts/admin";
import cookies from "next-cookies";

export async function getServerSideProps(ctx) {
	const { token } = cookies(ctx);
	const { id } = ctx.params;
	const res = await axios.get(`http://localhost:5000/api/article/${id}`);
	const article = await res.data;
	return {
		props: { article, token, id },
	};
}
export default function Edit({ article, token, id }) {
	const [field, setField] = useState({
		title: article.title,
		cover: article.cover,
		content: article.content,
	});

	useEffect(() => {
		let file = document.getElementsByName("cover")[0];
		function FileListItems(files) {
			var b = new ClipboardEvent("").clipboardData || new DataTransfer();
			for (var i = 0, len = files.length; i < len; i++)
				b.items.add(files[i]);
			return b.files;
		}
		let files = [new File(["content"], article.cover)];
		file.files = new FileListItems(files);
	}, []);
	const handleGetMdValue = ({ html, text }, event) => {
		setField({ ...field, content: text });
	};
	const uploadToClient = (e) => {
		if (e.target.files && e.target.files[0]) {
			const i = e.target.files[0];
			setField({ ...field, cover: i });
		}
	};

	const handleChange = (e) => {
		e.preventDefault();
		const attr = e.target;
		setField({
			...field,
			[attr.name]: attr.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const body = new FormData();
		body.append("cover", field.cover);
		body.append("title", field.title);
		body.append("content", field.content);
		body.append("slug", article.slug);
		await axios(`http://localhost:5000/api/article/${id}`, {
			method: "PUT",
			data: body,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	};
	return (
		<div className='bg-white min-h-screen'>
			<div className='p-20'>
				<div className='w-full flex wrap'>
					<div className='w-1/2 mb-4 px-2'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>
							Title
						</label>
						<input
							type='text'
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							name='title'
							defaultValue={article.title}
							onChange={handleChange}
						/>
					</div>
					<div className='w-1/2 mb-4 px-2'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>
							Cover
						</label>
						<input
							type='file'
							name='cover'
							className='shadow block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-500 bg-white rounded overflow-hidden ocus:outline-none focus:shadow-outline'
							onChange={uploadToClient}
						/>
					</div>
				</div>
				<div className='mb-4'>
					<span className='text-white block'>content</span>
					<Markdown
						defaultValue={article.content}
						handleEditorChange={handleGetMdValue}
					/>
				</div>
				<button
					className='px-4 py-3 rounded-lg bg-blue-200'
					onClick={onSubmit}>
					submit
				</button>
			</div>
		</div>
	);
}

Edit.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
