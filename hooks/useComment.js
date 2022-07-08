import { useState } from 'react';
import useSWR from 'swr';
import { useAuth0 } from '@auth0/auth0-react';

export default function useComments() {
	const { getAccessTokenSilently, user } = useAuth0();
	const [comment, setComment] = useState('');
	const getComment = async () => {
		try {
			const res = await fetch('https://dhanio-blog.herokuapp.com/api/comment');
			const data = await res.json();
			return data;
		} catch (err) {
			console.log(err);
		}
	};
	const { data, mutate } = useSWR('https://dhanio-blog.herokuapp.com/api/comment', getComment);

	const onSubmit = async (e) => {
		e.preventDefault();
		const token = await getAccessTokenSilently();

		try {
			await fetch('https://dhanio-blog.herokuapp.com/api/comment', {
				method: 'POST',
				body: JSON.stringify({
					article: comment.article,
					comment: comment.comment,
					guest: user,
				}),
				headers: {
					Authorization: token,
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
			console.log(err);
		}
	};

	const onDelete = async (comment) => {
		const token = await getAccessTokenSilently();

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
			console.log(err);
		}
	};

	return { comment, setComment, data, onSubmit, onDelete };
}
