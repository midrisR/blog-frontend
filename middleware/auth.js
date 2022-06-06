import cookies from "next-cookies";

// check if user is not login and try to access admin page
export function authPageAdmin(ctx) {
	return new Promise((resolve) => {
		const allCookies = cookies(ctx);
		if (!allCookies.token)
			return ctx.res
				.writeHead(302, {
					Location: "/auth/login",
				})
				.end();
		return resolve("unauthorized");
	});
}

// check if user is already login and try to access login page it will be redirected to admin page
export function authPage(ctx) {
	return new Promise((resolve) => {
		const allCookies = cookies(ctx);
		if (allCookies.token)
			return ctx.res
				.writeHead(302, {
					Location: "/admin",
				})
				.end();
		return resolve("unauthorized");
	});
}
