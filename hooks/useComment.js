import { useState } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

export default function useComments(id) {
	const { data: session } = useSession();
	const [comment, setComment] = useState('');
	const getComment = async () => {
		try {
			const res = await fetch(`https://dhanio-blog.herokuapp.com/api/comment/${id}`);
			const data = await res.json();
			return data;
		} catch (err) {
			throw new Error(err.response.message);
		}
	};
	const { data, mutate } = useSWR(
		`https://dhanio-blog.herokuapp.com/api/comment/${id}`,
		getComment
	);

	const onSubmit = async (e) => {
		e.preventDefault();
		const { user } = session;

		try {
			await fetch('https://dhanio-blog.herokuapp.com/api/comment', {
				method: 'POST',
				body: JSON.stringify({
					article: comment.article,
					comment: comment.comment,
					guest: user,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setComment({
				article: '',
				comment: '',
				guest: '',
			});
			await mutate();
		} catch (err) {
			throw new Error(err.response.message);
		}
	};

	const onDelete = async (comment) => {
		try {
			await fetch('https://dhanio-blog.herokuapp.com/api/comment', {
				method: 'DELETE',
				body: JSON.stringify({ comment }),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
			});
			await mutate();
		} catch (err) {
			throw new Error(err.response.message);
		}
	};

	return { comment, setComment, data, onSubmit, onDelete };
}
