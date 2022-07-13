import { useSession, signOut } from 'next-auth/react';

export default function CommentForm({ comment, setComment, onSubmit, id, setIsOpen }) {
	const { data: session } = useSession();

	return (
		<form onSubmit={onSubmit}>
			<textarea
				className="flex w-full max-h-40 p-3 rounded-lg resize-y shadow-md border bg-white-800 text-black placeholder-gray-500"
				rows="2"
				placeholder={
					session ? `What are your thoughts?` : 'Please login to leave a comment'
				}
				onChange={(e) => setComment({ article: id, comment: e.target.value })}
				value={comment.comment}
				disabled={!session}
			/>

			<div className="flex items-center mt-4">
				{session ? (
					<div className="flex items-center space-x-6">
						<button className="py-2 px-4 rounded bg-slate-800 text-white disabled:opacity-40 hover:bg-blue-700">
							Send
						</button>
						<button className="text-white bg-red-500 " onClick={() => signOut()}>
							Log out
						</button>
					</div>
				) : (
					<button
						type="button"
						className="py-2 px-4 rounded bg-blue-500 text-white disabled:opacity-40 "
						onClick={() => setIsOpen((prev) => !prev)}>
						Log In
					</button>
				)}
			</div>
		</form>
	);
}
