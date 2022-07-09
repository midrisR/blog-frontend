export default function CommentList({ comments, onDelete }) {
	if (!comments) return null;
	return (
		<div className="space-y-6 mt-10">
			{comments.map((comment, i) => {
				return (
					<div key={i} className="flex space-x-4">
						<div className="flex-shrink-0">
							<img
								src={comment.guest.image}
								alt={comment.guest.nickname}
								width={40}
								height={40}
								className="rounded-full"
							/>
						</div>

						<div className="flex-grow">
							<div className="flex space-x-2">
								<span className="text-white font-semibold">
									{comment.guest.nickname}
								</span>
							</div>
							<div className="text-white">{comment.comment}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
