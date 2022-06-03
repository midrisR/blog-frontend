import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import RenderMd from "./Md";

const MdEditor = dynamic(
	() => {
		return new Promise((resolve) => {
			Promise.all([
				import("react-markdown-editor-lite"),
				import("./plugins/imageUpload"),
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

function Markdown({ handleEditorChange }) {
	const onImageUpload = (file, callback) => {
		const reader = new FileReader();
		reader.onload = (data) => {
			setTimeout(() => {
				callback(data.target.result);
			}, 1000);
		};
		reader.readAsDataURL(file);
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
				syncScrollMode: ["leftFollowRight", "rightFollowLeft"],
			}}
			className='w-full'
			onImageUpload={onImageUpload}
			name='content'
			style={{ height: "500px" }}
			renderHTML={(text) => <RenderMd markdown={text} />}
			onChange={handleEditorChange}
		/>
	);
}
export default Markdown;
