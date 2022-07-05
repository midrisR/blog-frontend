import { useAuth0 } from '@auth0/auth0-react';

export default function CommentForm({ comment, setComment, onSubmit, id }) {
	const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();

	return (
		<form onSubmit={onSubmit}>
			<textarea
				className="flex w-full max-h-40 p-3 rounded resize-y bg-slate-800 text-slate-100 placeholder-gray-500"
				rows="2"
				placeholder={
					isAuthenticated ? `What are your thoughts?` : 'Please login to leave a comment'
				}
				onChange={(e) => setComment({ article: id, comment: e.target.value })}
				value={comment.comment}
				disabled={!isAuthenticated}
			/>

			<div className="flex items-center mt-4">
				{isAuthenticated ? (
					<div className="flex items-center space-x-6">
						<button className="py-2 px-4 rounded bg-slate-800 text-white disabled:opacity-40 hover:bg-blue-700">
							Send
						</button>
						<button className="text-gray-500" onClick={() => logout()}>
							Log out
						</button>
					</div>
				) : (
					<button
						type="button"
						className="py-2 px-4 rounded bg-slate-800 text-white disabled:opacity-40 hover:bg-slate-900"
						onClick={() => loginWithPopup()}>
						Log In
					</button>
				)}
				w
			</div>
		</form>
	);
}
