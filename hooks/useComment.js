import React, { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

export default function useComments(id) {
	const { data: session } = useSession();
	const [comment, setComment] = useState('');

	const getComment = async () => {
		try {
			const res = await axios(`https://dhanio-blog.herokuapp.com/api/comment/${id}`);
			return res.data;
		} catch (err) {
			console.log('error', error);
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
			console.log('error', error);
		}
	};

	return { comment, setComment, data, onSubmit };
}
