import Markdown from "../../../components/MarkdownEditor";
import { useState } from "react";
import axios from "axios";
import Admin from "../../../components/layouts/admin";
import cookies from "next-cookies";

export async function getServerSideProps(ctx) {
	const { token } = cookies(ctx);
	return {
		props: { token },
	};
}
export default function Create({ token }) {
	const [field, setField] = useState({
		title: "",
		cover: "",
		content: "",
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

	const onSubmit = (e) => {
		e.preventDefault();
		const body = new FormData();
		body.append("cover", field.cover);
		body.append("title", field.title);
		body.append("content", field.content);
		axios("http://localhost:5000/api/article", {
			method: "POST",
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
		<div className='bg-white min-h-screen'>
			<div className='p-20'>
				<div className='w-full flex wrap'>
					<div className='w-1/2 mb-4 px-2'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>
							Title
						</label>
						<input
							onChange={handleChange}
							type='text'
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							name='title'
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
					<Markdown handleEditorChange={handleGetMdValue} />
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

Create.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
