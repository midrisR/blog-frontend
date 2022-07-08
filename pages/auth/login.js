import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import cookies from 'next-cookies';
import Input from '../../components/form/input';
import Form from '../../components/form/form';
import Button from '../../components/form/button';
import { authPage } from '../../middleware/auth';
export const getServerSideProps = async (ctx) => {
	await authPage(ctx);
	return {
		props: {},
	};
};

export default function Login() {
	const [error, setError] = useState([]);
	const [value, setValue] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const attr = e.target;
		setValue({
			...value,
			[attr.name]: attr.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const url = 'https://dhanio-blog.herokuapp.com/api/user/login';
		try {
			const res = await axios(url, {
				method: 'POST',
				data: value,
			});
			Cookies.set('token', res.data.token, { path: '/' });
			Router.push('/admin');
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<div className="h-screen bg-slate-100 flex justify-center items-center">
			<div className="w-full max-w-xs">
				<Form onSubmit={handleSubmit} error={error}>
					<Input
						type="text"
						onChange={handleChange}
						name="email"
						placeholder="input your email"
						autoComplete="off"
						error={error['email']}
					/>
					<Input
						type="password"
						onChange={handleChange}
						name="password"
						placeholder="input your password"
						error={error['password']}
					/>
					<div className="flex items-center justify-between"></div>
					<Button
						type="submit"
						title="Log in"
						className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg"
					/>
				</Form>
			</div>
		</div>
	);
}
