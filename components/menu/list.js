import { MdArticle, MdPerson } from 'react-icons/md';
export const List = [
	{
		title: 'Articles',
		url: '/admin/article',
		icon: <MdArticle size={26} className="text-slate-300" />,
	},
	{
		title: 'Users',
		url: '/admin/user',
		icon: <MdPerson size={26} className="text-slate-300" />,
	},
];
