import CommentForm from './form';
import useComments from '../../hooks/useComment';
import CommentList from './list';

export default function Comment({ id, setIsOpen }) {
	const { setComment, comment, onSubmit, data } = useComments(id);
	return (
		<div className="mt-20">
			<CommentForm
				onSubmit={onSubmit}
				id={id}
				comment={comment}
				setComment={setComment}
				setIsOpen={setIsOpen}
			/>
			<CommentList comments={data} />
		</div>
	);
}
