import { useState, useEffect } from 'react';
import Admin from '../../../components/layouts/admin';
import { authPageAdmin } from '../../../middleware/auth';
import axios from 'axios';
import Link from 'next/link';
import { AiFillGithub, AiFillYoutube, AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai';
import { useRouter } from 'next/router';

export async function getServerSideProps(ctx) {
	const { token } = await authPageAdmin(ctx);

	const res = await axios.get('http://localhost:5000/api/user/me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const user = res.data;
	return {
		props: { user, token },
	};
}

export default function User({ user, token }) {
	const [update, setUpdate] = useState(false);
	const router = useRouter();
	const [field, setField] = useState({
		name: user.name,
		avatar: user.avatar,
		socialMedia: {
			facebook: user.socialMedia.facebook,
			instagram: user.socialMedia.instagram,
			twitter: user.socialMedia.twitter,
			github: user.socialMedia.github,
			youtube: user.socialMedia.youtube,
		},
	});

	const [isRefreshing, setIsRefreshing] = useState(false);
	const refreshData = () => {
		router.replace(router.asPath);
		setIsRefreshing(true);
	};
	useEffect(() => {
		setIsRefreshing(false);
	}, [user]);

	const handleupdate = () => {
		setUpdate((update) => !update);
	};

	const handleChange = (e) => {
		const attr = e.target;
		setField({
			...field,
			[attr.name]: attr.value,
		});
	};

	const handleSosmed = (e) => {
		let data = field.socialMedia;
		data[e.target.name] = e.target.value;
		setField({ ...field, socialMedia: data });
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('name', field.name);
		formData.append('avatar', field.avatar);
		formData.append('socialMedia', JSON.stringify(field.socialMedia));

		axios('http://localhost:5000/api/user/me/update', {
			method: 'PUT',
			data: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				setUpdate((update) => !update);
				refreshData();
			})
			.catch(function (error) {
				console.log(error.response);
			});
	};
	return (
		<>
			<div className="flex justify-end mb-2">
				<button className="bg-slate-900 text-slate-200 px-3 py-2" onClick={handleupdate}>
					Update
				</button>
			</div>
			<div className="bg-slate-800 rounded-lg flex overflow-hidden">
				<div className="w-2/6">
					<img
						src={`http://localhost:5000/uploads/user/${user.avatar}`}
						alt={user.name}
					/>
				</div>

				{update ? (
					<div className="mt-4 px-4">
						<div className="w-1/2 mb-4 px-2">
							<label className="block text-slate-200 text-sm font-bold mb-2">
								Name
							</label>
							<input
								type="text"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								onChange={handleChange}
								name="name"
								defaultValue={user.name}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							{Object.keys(field.socialMedia).map((input, i) => (
								<div key={i} className="mb-4 px-2">
									<label className="block text-slate-200 text-sm font-bold mb-2">
										{input}
									</label>
									<input
										type="text"
										onChange={handleSosmed}
										defaultValue={user.socialMedia[input]}
										name={input}
										placeholder={input}
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
							))}
						</div>
						<div className="px-2">
							<button
								className="bg-slate-200 px-4 py-2 rounded focus:outline-none font-semibold"
								onClick={handleUpdate}>
								Update
							</button>
						</div>
					</div>
				) : (
					<>
						<div className="w-5/6 mt-2 px-10">
							<h3 className="py-4 text-xl text-slate-200 font-bold">{user.name}</h3>

							<blockquote className="bg-slate-300 px-8 py-3 rounded-lg italic text-slate-100 bg-opacity-25 border-l-8 border-l-slate-500">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nam
									odio aliquid mollitia officia fuga ratione pariatur? Aperiam
									nemo at consequuntur perspiciatis optio, eos ipsam sit nesciunt
									molestiae quibusdam ipsum?
								</p>
							</blockquote>

							<div className="mt-4">
								<Link href={`https://github.com/${user.socialMedia.github}`}>
									<a className="flex items-center mb-4 text-slate-200">
										<AiFillGithub size={24} />
										<span className="ml-2">{user.socialMedia.github}</span>
									</a>
								</Link>
								<Link href={`https://facebook.com/${user.socialMedia.facebook}`}>
									<a className="flex mb-4 text-blue-500">
										<AiFillFacebook className="w-6 h-6" />
										<span className="ml-2">{user.socialMedia.facebook}</span>
									</a>
								</Link>
								<Link href={`https://twitter.com/${user.socialMedia.twitter}`}>
									<a className="flex mb-4 text-sky-400">
										<AiOutlineTwitter className="w-6 h-6" />
										<span className="ml-2">{user.socialMedia.twitter}</span>
									</a>
								</Link>
								<Link href={`https://youtube.com/${user.socialMedia.youtube}`}>
									<a className="flex mb-4 text-red-500">
										<AiFillYoutube className="w-6 h-6" />
										<span className="ml-2">{user.socialMedia.youtube}</span>
									</a>
								</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
User.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
