import { useState, useEffect } from 'react';
import Admin from '../../../components/layouts/admin';
import { authPageAdmin } from '../../../middleware/auth';
import axios from 'axios';
import Link from 'next/link';
import { AiFillGithub, AiFillYoutube, AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Input from '../../../components/form/input';
import Textarea from '../../../components/form/textarea';
import Modal from '../../../components/form/modal';

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
	console.log(user);
	const [update, setUpdate] = useState(false);
	const [error, setError] = useState([]);
	const router = useRouter();
	const [field, setField] = useState({
		name: user.name,
		about: user.about,
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

	const handleUpdate = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('name', field.name);
		formData.append('about', field.about);
		formData.append('avatar', field.avatar);
		formData.append('socialMedia', JSON.stringify(field.socialMedia));
		try {
			await axios('http://localhost:5000/api/user/me/update', {
				method: 'PUT',
				data: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUpdate((update) => !update);
			refreshData();
		} catch (error) {
			setError(error.response.data.message);
		}
	};
	return (
		<>
			<div className="flex justify-end mb-2">
				<button className="bg-slate-900 text-slate-200 px-3 py-2" onClick={handleupdate}>
					Update profile
				</button>
			</div>
			<Modal show={update} onClose={handleUpdate}>
				<div className="w-1/2 mb-4 px-2">
					<Input
						type="text"
						onChange={handleChange}
						name="name"
						autoComplete="off"
						error={error['name']}
						defaultValue={user.name}
					/>
				</div>
				<Textarea
					name="about"
					onChange={handleChange}
					defaultValue={user.about}
					error={error['about']}
				/>
				<div className="flex flex-wrap lg:my-0">
					{Object.keys(field.socialMedia).map((input, i) => (
						<div className="w-1/3 px-2" key={i}>
							<Input
								type="text"
								onChange={handleSosmed}
								defaultValue={user.socialMedia[input]}
								name={input}
								placeholder={input}
							/>
						</div>
					))}
				</div>
				<div className="px-2">
					<button
						type="button"
						onClick={handleUpdate}
						className="text-slate-200 bg-purple-600 hover:bg-purple-70 rounded-lg text-sm font-medium px-5 py-2.5 ">
						Update Profile
					</button>
				</div>
			</Modal>
			<div className="bg-slate-800 rounded-lg flex overflow-hidden">
				<div className="w-2/6">
					<img
						src={`http://localhost:5000/uploads/user/${user.avatar}`}
						alt={user.name}
					/>
				</div>

				<div className="w-5/6 mt-2 px-10">
					<h3 className="py-4 text-xl text-slate-200 font-bold">{user.name}</h3>
					<blockquote className="bg-slate-300 px-8 py-3 rounded-lg italic text-slate-100 bg-opacity-25 border-l-8 border-l-slate-500">
						<p>{user.about}</p>
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
			</div>
		</>
	);
}
User.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
