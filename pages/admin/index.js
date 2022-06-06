import Admin from "../../components/layouts/admin";
import { authPageAdmin } from "../../middleware/auth";

export const getServerSideProps = async (ctx) => {
	await authPageAdmin(ctx);
	return {
		props: {},
	};
};
export default function PageAdmin() {
	return (
		<h1 className='text-center text-4xl text-gray-500 font-black'>
			HALAMAN ADMIN
		</h1>
	);
}

PageAdmin.getLayout = function getLayout(page) {
	return <Admin>{page}</Admin>;
};
