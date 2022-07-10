import { useSession, signOut } from 'next-auth/react';
export default function ButtonLogin({ setIsOpen }) {
	const { data: session } = useSession();
	return (
		<div className="flex items-center mt-4">
			{session ? (
				<div className="flex items-center space-x-6">
					<button className="text-gray-500" onClick={() => signOut()}>
						Log out
					</button>
				</div>
			) : (
				<button
					type="button"
					className="py-2 px-4 rounded bg-white text-black disabled:opacity-40 "
					onClick={() => setIsOpen((prev) => !prev)}>
					Log In
				</button>
			)}
		</div>
	);
}
