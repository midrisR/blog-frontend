import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import RenderMd from "./Md";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
	ssr: false,
});
function Markdown({ handleEditorChange }) {
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
				imageUrl: "https://octodex.github.com/images/minion.png",
				syncScrollMode: ["leftFollowRight", "rightFollowLeft"],
			}}
			className='w-full'
			name='content'
			style={{ height: "500px" }}
			renderHTML={(text) => <RenderMd markdown={text} />}
			onChange={handleEditorChange}
		/>
	);
}
export default Markdown;
