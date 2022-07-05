import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';
import RenderMd from './Md';
import axios from 'axios';
const MdEditor = dynamic(
	() => {
		return new Promise((resolve) => {
			Promise.all([
				import('react-markdown-editor-lite'),
				import('../plugins/imageUpload'),
			]).then((res) => {
				res[0].default.use(res[1].default);
				resolve(res[0].default);
			});
		});
	},
	{
		ssr: false,
	}
);
function Markdown({ defaultValue, handleEditorChange }) {
	const [error, setError] = useState([]);

	const onImageUpload = async (file, callback) => {
		const formData = new FormData();
		formData.append('file', file);

		const match = ['image/png', 'image/jpeg', 'image/jpg'];

		if (match.indexOf(file.type) === -1) {
			alert('file must be .png, .jpg and .jpeg format allowed!');
			return;
		}

		try {
			const data = await axios.post('http://localhost:5000/api/image', formData);
			callback(data.data.file);
		} catch (error) {
			setError(() => ({
				status: true,
				message: error.response.data.message,
			}));
			callback(null);
		}
	};

	return (
		<MdEditor
			config={{
				view: {
					menu: true,
					md: true,
					html: false,
					fullScreen: false,
					hideMenu: true,
				},
				table: {
					maxRow: 5,
					maxCol: 6,
				},
				syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
			}}
			onImageUpload={onImageUpload}
			imageAccept=".jpg,.png"
			className="w-full"
			name="content"
			defaultValue={defaultValue}
			style={{ height: '500px' }}
			renderHTML={(text) => <RenderMd markdown={text} />}
			onChange={handleEditorChange}
		/>
	);
}
export default Markdown;
