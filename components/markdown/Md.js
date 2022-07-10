import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
const { dracula } = require('react-syntax-highlighter/dist/cjs/styles/prism');
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function RenderMd({ markdown }) {
	return (
		<>
			{markdown && (
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					unwrapDisallowed={true}
					children={markdown}
					components={{
						code({ node, inline, className, children, ...props }) {
							const match = /language-(\w+)/.exec(className || '');
							return !inline && match ? (
								<SyntaxHighlighter
									children={String(children).replace(/\n$/, '')}
									style={dracula}
									language={match[1]}
									PreTag="div"
									wrapLines={true}
									wrapLongLines={true}
									{...props}
								/>
							) : (
								<code className={className} {...props}>
									{children}
								</code>
							);
						},
					}}
				/>
			)}
		</>
	);
}
