import CommentForm from './form';
import useComments from '../../hooks/useComment';
import CommentList from './list';

export default function Comment({ id, setIsOpen, comments }) {
	const { setComment, comment, onSubmit } = useComments(id);
	return (
		<div className="mt-20">
			<CommentForm
				onSubmit={onSubmit}
				id={id}
				comment={comment}
				setComment={setComment}
				setIsOpen={setIsOpen}
			/>
			<CommentList comments={comments} />
		</div>
	);
}
