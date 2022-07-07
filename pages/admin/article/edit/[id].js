import { useState } from 'react';
import axios from 'axios';
import cookies from 'next-cookies';
import Router from 'next/router';
import Markdown from '../../../../components/markdown/MarkdownEditor';
import { authPageAdmin } from '../../../../middleware/auth';
import Admin from '../../../../components/layouts/admin';

// form
import Input from '../../../../components/form/input';
import InputFile from '../../../../components/form/InputFile';
import SwitchToggle from '../../../../components/form/switches';
import Button from '../../../../components/form/button';

export async function getServerSideProps(ctx) {
	await authPageAdmin(ctx);
	const { token } = cookies(ctx);
	const { id } = ctx.params;
	const res = await axios.get(`http://localhost:5000/api/article/${id}`);
	const article = await res.data;
	return {
		props: { article, token, id },
	};
}
export default function Edit({ article, token, id }) {
	const [error, setError] = useState([]);
	const [field, setField] = useState({
		title: article.title,
		file: article.cover,
		content: article.content,
		active: article.active,
		featured: article.featured,
		tag: article.tag,
	});

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

	const onSubmit = async (e) => {
		e.preventDefault();

		const body = new FormData();
		body.append('file', field.cover);
		body.append('title', field.title);
		body.append('content', field.content);
		body.append('active', field.active);
		body.append('featured', field.featured);
		body.append('slug', article.slug);
		body.append('tag', field.tag);
		try {
			await axios(`http://localhost:5000/api/article/${id}`, {
				method: 'PUT',
				data: body,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			Router.push('/admin/article');
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<div className="bg-white min-h-screen rounded-xl mb-20">
			<div className="p-20">
				<div className="w-full flex gap-2">
					<Input
						className="w-1/2"
						type="text"
						onChange={handleChange}
						name="title"
						autoComplete="off"
						defaultValue={article.title}
						error={error['title']}
					/>
					<InputFile
						className="w-1/2"
						name="file"
						onChange={uploadToClient}
						error={error['file']}
					/>
				</div>
				<Input
					className="w-1/2"
					type="text"
					onChange={handleChange}
					name="tag"
					autoComplete="off"
					error={error['tag']}
					defaultValue={article.tag}
				/>
				<div className="flex px-2 w-1/2 justify-between">
					<SwitchToggle
						name="active"
						checked={field.active}
						onChange={handleChecked}
						error={error['active']}
						defaultValue={article.active}
					/>
					<SwitchToggle
						name="featured"
						checked={field.featured}
						onChange={handleChecked}
						error={error['featured']}
						defaultValue={article.featured}
					/>
				</div>

				<div className="mb-4">
					<span className="text-white block">content</span>
					<Markdown
						defaultValue={article.content}
						handleEditorChange={handleGetMdValue}
					/>
					<Button
						title="Submit"
						onClick={onSubmit}
						className="px-4 py-3 mt-6 rounded-lg bg-purple-600 text-slate-200"
					/>
				</div>
			</div>
		</div>
	);
}

Edit.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
