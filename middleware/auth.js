import cookies from 'next-cookies';
import axios from 'axios';

export async function validatsiToken(ctx) {
	const { token } = cookies(ctx);
	try {
		await axios.get('https://dhanio-blog.herokuapp.com/api/user/me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		if (error.response.status === 401)
			ctx.res.setHeader('Set-Cookie', [
				`token=deleted; Max-Age=0`,
				`AnotherCookieName=deleted; Max-Age=0`,
			]);
		return ctx.res
			.writeHead(302, {
				Location: '/auth/login',
			})
			.end();
	}
}

// check if user is not login and try to access admin page
export function authPageAdmin(ctx) {
	return new Promise((resolve) => {
		const allCookies = cookies(ctx);
		if (!allCookies.token)
			return ctx.res
				.writeHead(302, {
					Location: '/auth/login',
				})
				.end();
		return resolve({
			token: allCookies.token,
		});
	});
}

// check if user is already login and try to access login page it will be redirected to admin page
export function authPage(ctx) {
	return new Promise((resolve) => {
		const allCookies = cookies(ctx);
		if (allCookies.token)
			return ctx.res
				.writeHead(302, {
					Location: '/admin',
				})
				.end();
		return resolve('unauthorized');
	});
}
