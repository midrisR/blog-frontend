import Markdown from '../../../components/MarkdownEditor';
import { useState } from 'react';
import axios from 'axios';
import Admin from '../../../components/layouts/admin';
import cookies from 'next-cookies';
import { authPageAdmin } from '../../../middleware/auth';

export async function getServerSideProps(ctx) {
	await authPageAdmin(ctx);
	const { token } = cookies(ctx);
	return {
		props: { token },
	};
}
export default function Create({ token }) {
	const [field, setField] = useState({
		title: '',
		cover: '',
		content: '',
		tag: '',
		active: false,
		featured: false,
	});

	const handleGetMdValue = ({ html, text }, event) => {
		setField({ ...field, content: text });
	};
	const uploadToClient = (event) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];
			setField({ ...field, cover: i });
		}
	};

	const handleChange = (e) => {
		const attr = e.target;
		setField({
			...field,
			[attr.name]: attr.value,
		});
	};
	const handleChecked = (e) => {
		const attr = e.target;
		setField((value) => ({
			...field,
			[attr.name]: !value[attr.name],
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const body = new FormData();
		body.append('cover', field.cover);
		body.append('title', field.title);
		body.append('content', field.content);
		body.append('tag', field.tag);
		body.append('active', field.active);
		body.append('featured', field.featured);
		axios('http://localhost:5000/api/article', {
			method: 'POST',
			data: body,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error.response.data.message);
			});
	};
	return (
		<div className="bg-slate-800 rounded-xl min-h-screen">
			<div className="p-20">
				<div className="w-full flex wrap">
					<div className="w-1/2 mb-4 px-2">
						<label className="block text-slate-200 text-sm font-bold mb-2">Title</label>
						<input
							onChange={handleChange}
							type="text"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							name="title"
						/>
					</div>
					<div className="w-1/2 mb-4 px-2">
						<label className="block text-slate-200 text-sm font-bold mb-2">Cover</label>
						<input
							type="file"
							name="cover"
							className="shadow block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-500 bg-white rounded overflow-hidden ocus:outline-none focus:shadow-outline"
							onChange={uploadToClient}
						/>
					</div>
				</div>
				<div className="w-1/2 mb-4 px-2">
					<label className="block text-slate-200 text-sm font-bold mb-2">Tag</label>
					<input
						onChange={handleChange}
						type="text"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="tag"
					/>
				</div>
				<div className="flex px-2 w-1/2 justify-between">
					<div className="flex">
						<label className="block text-slate-200 text-sm font-bold mb-2 mr-3">
							Active
						</label>
						<div className="form-check form-switch">
							<label className="inline-flex relative items-center cursor-pointer">
								<input
									type="checkbox"
									name="active"
									className="sr-only peer"
									checked={field.active}
									onChange={handleChecked}
								/>
								<div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5  peer-checked:bg-blue-600 after:transition-all"></div>
							</label>
						</div>
					</div>
					{/* featured */}
					<div className="flex">
						<label className="block text-slate-200 text-sm font-bold mb-2 mr-3">
							Featured
						</label>
						<div className="form-check form-switch">
							<label className="inline-flex relative items-center cursor-pointer">
								<input
									type="checkbox"
									name="featured"
									className="sr-only peer"
									checked={field.featured}
									onChange={handleChecked}
								/>
								<div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 peer-checked:bg-blue-600 after:transition-all"></div>
							</label>
						</div>
					</div>
				</div>
				<div className="mb-4 px-2 mt-6">
					<label className="block text-slate-200 text-sm font-bold mb-2">Content</label>
					<Markdown handleEditorChange={handleGetMdValue} />
				</div>
				<button className="px-4 py-3 rounded-lg bg-blue-200" onClick={onSubmit}>
					submit
				</button>
			</div>
		</div>
	);
}

Create.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
