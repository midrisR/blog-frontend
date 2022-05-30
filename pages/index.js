import Markdown from "../components/Markdown";
import RenderMd from "../components/Md";
import { useState } from "react";
import axios from "axios";

export default function home({ blog }) {
	console.log(blog);
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
		axios
			.post("http://localhost:5000/api/article", body)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error.response.data.message);
			});
	};
	return (
		<div className='bg-slate-900 min-h-screen'>
			<div className='p-20'>
				<div className='w-full flex flex-wrap'>
					<div className='w-1/2'>
						<div className='mb-1'>
							<span className='text-white block'>title</span>
							<input
								onChange={handleChange}
								type='text'
								className='bg-white px-3 py-2 rounded-lg focus:outline-none'
								name='title'
							/>
						</div>
						<div className='mb-1'>
							<span className='text-white block'>cover</span>
							<input
								type='file'
								className='bg-white px-3 py-2 rounded-lg focus:outline-none'
								name='cover'
								onChange={uploadToClient}
							/>
						</div>
						<div className='mb-1'>
							<span className='text-white block'>content</span>
							<Markdown handleEditorChange={handleGetMdValue} />
						</div>
						<button className='px-4 py-3 rounded-lg bg-blue-200' onClick={onSubmit}>
							submit
						</button>
					</div>
					<div className='w-1/2'>
						<div className='p-10'>
							<h1 className='text-4xl text-white font-bold mb-5'>{blog.article.title}</h1>
							<img src={`http://localhost:5000/uploads/${blog.article.cover}`} alt='' />
							<RenderMd markdown={blog.article.content} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	const res = await fetch(`http://localhost:5000/api/article/6294eb45cdc75f3aa80bdefa`);
	const blog = await res.json();
	// console.log(blog.article);
	return {
		props: { blog }, // will be passed to the page component as props
	};
}
