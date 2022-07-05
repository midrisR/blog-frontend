import CommentForm from './form';
import useComments from '../../hooks/useComment';
import CommentList from './list';

export default function Comment({ id }) {
	const { setComment, comment, onSubmit, data } = useComments();

	return (
		<div className="mt-20">
			<CommentForm onSubmit={onSubmit} id={id} comment={comment} setComment={setComment} />
			<CommentList comments={data} />
		</div>
	);
}
