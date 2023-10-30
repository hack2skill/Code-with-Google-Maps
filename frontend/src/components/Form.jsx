import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Form() {
	// Create state variables to store form input values
	const [name, setName] = useState("");
	const [ctype, setCtype] = useState("");
	const [cloc, setCloc] = useState("");
	const [target, setTarget] = useState("");
	const [scale, setScale] = useState("small"); // Default value
	const navigate = useNavigate();
	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		// Here, you can send the form data to your backend or perform other actions.
		// Store data in localStorage
		localStorage.setItem("company_name", name);
		localStorage.setItem("Company_Type", ctype);
		localStorage.setItem("Company_target", target);
		localStorage.setItem("Company_size", scale);
		navigate("/map");
	};

	return (
		<>
			<Navbar />
			<div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div
					className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
					aria-hidden="true"
				>
					<div
						className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Fill in the details
					</h2>
				</div>
				<form
					onSubmit={handleSubmit}
					className="mx-auto mt-16 max-w-xl sm:mt-20"
				>
					<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Company Name
							</label>
							<div className="mt-2.5">
								<input
									type="text"
									name="name"
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="ctype"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Company Type
							</label>
							<div className="mt-2.5">
								<input
									type="text"
									name="ctype"
									id="ctype"
									value={ctype}
									onChange={(e) => setCtype(e.target.value)}
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						
					
						<div className="sm:col-span-2">
							<label
								htmlFor="scale"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Company Scale
							</label>
							<div className="mt-2.5">
								<select
									name="scale"
									id="scale"
									value={scale}
									onChange={(e) => setScale(e.target.value)}
									className="block w-full p-2 border bg-white rounded-md"
								>
									<option value="small">Small Scale</option>
									<option value="medium">Medium Scale</option>
									<option value="large">Large Scale</option>
								</select>
							</div>
						</div>
					</div>
					<div className="mt-10">
						<button
							type="submit"
							className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
