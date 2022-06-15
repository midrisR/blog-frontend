import { useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';

export default function Admin({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<main className="px-10 py-8">{children}</main>
			</div>
		</div>
	);
}
