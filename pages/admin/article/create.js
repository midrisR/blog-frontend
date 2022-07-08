import Markdown from '../../../components/markdown/MarkdownEditor';
import { useState } from 'react';
import axios from 'axios';
import Admin from '../../../components/layouts/admin';
import cookies from 'next-cookies';
import { authPageAdmin } from '../../../middleware/auth';
import Input from '../../../components/form/input';
import InputFile from '../../../components/form/InputFile';
import SwitchToggle from '../../../components/form/switches';
import Button from '../../../components/form/button';
import Router from 'next/router';
export async function getServerSideProps(ctx) {
	await authPageAdmin(ctx);
	const { token } = cookies(ctx);
	return {
		props: { token },
	};
}
export default function Create({ token }) {
	const [error, setError] = useState([]);
	const [field, setField] = useState({
		title: '',
		file: '',
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
			setField({ ...field, file: i });
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
		body.append('file', field.file);
		body.append('title', field.title);
		body.append('content', field.content);
		body.append('tag', field.tag);
		body.append('active', field.active);
		body.append('featured', field.featured);
		axios('https://dhanio-blog.herokuapp.com/api/article', {
			method: 'POST',
			data: body,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				Router.push('/admin/article');
			})
			.catch(function (error) {
				setError(error.response.data.message);
			});
	};
	return (
		<div className="bg-white shadow-lg rounded-xl min-h-screen">
			<div className="p-20">
				<div className="w-full flex wrap gap-2">
					<Input
						className="w-1/2"
						type="text"
						onChange={handleChange}
						name="title"
						autoComplete="off"
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
				/>
				<div className="flex px-2 w-1/2 justify-between">
					<SwitchToggle
						name="active"
						checked={field.active}
						onChange={handleChecked}
						error={error['active']}
					/>
					<SwitchToggle
						name="featured"
						checked={field.featured}
						onChange={handleChecked}
						error={error['featured']}
					/>
				</div>
				<div className="mb-4 px-2 mt-6">
					<label className="block text-slate-800 text-sm font-bold mb-2">Content</label>
					<Markdown
						handleEditorChange={handleGetMdValue}
						name="content"
						mdError={error['content']}
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

Create.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
