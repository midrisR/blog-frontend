import Image from 'next/image';
export default function CommentList({ comments }) {
	return (
		<>
			{comments && (
				<div className="space-y-6 mt-10">
					{comments.map((comment, i) => {
						return (
							<div key={i} className="flex space-x-4">
								<div className="flex-shrink-0">
									<Image
										loading="lazy"
										src={comment.guest.image}
										alt={comment.guest.name}
										width={40}
										height={40}
										className="rounded-full"
									/>
								</div>
								<div className="flex-grow">
									<div className="flex space-x-2">
										<span className="text-sm text-black font-semibold">
											{comment.guest.name}
										</span>
										<span className="text-black text-sm ml-4">
											{new Date(comment.created_at).toDateString('id')}
										</span>
									</div>
									<div className="text-sm text-black">{comment.comment}</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}
