import React from "react";
import { Menu } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/Logo.jpg";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="z-50 -mt-2">
			<div className="w-full bg-white">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 -py-8  sm:px-6 lg:px-8">
					<div className="inline-flex items-center ">
						<img src={Logo} className="w-24" alt="logo" />
						<Link to="/">
							<span className="font-bold">Spotter</span>
						</Link>
					</div>
					<div className="hidden lg:block">
						<ul className="ml-12 inline-flex space-x-8">
							<li>
								<Link
									to="/"
									className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
								>
									Home
								</Link>
							</li>

							<li>
								<a
									href="#how"
									className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
								>
									How to use
								</a>
							</li>
						</ul>
					</div>
					<div className="ml-2 lg:hidden">
						<Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
					</div>
					{isMenuOpen && (
						<div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
							<div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
								<Outlet />
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
