export default function Features() {
	return (
		<div id="how" className="mx-auto  max-w-7xl px-2 lg:px-8">
			<div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{/* Feature 1 */}
				<div className="flex flex-col items-center p-4 overflow-auto max-h-[400px]">
					<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
						<h1 className="font-bold text-lg">1</h1>
					</div>
					<h3 className="mt-8 text-lg font-semibold text-black">
						Tell Us About Your Business
					</h3>
					<p className="mt-4 text-sm text-gray-600">
						Share some details about your business type, size, and industry. The
						more we know, the better we can help you.
					</p>
				</div>

				{/* Feature 2 */}
				<div className="flex flex-col items-center p-4 overflow-auto max-h-[400px]">
					<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
						<h1 className="font-bold text-lg">2</h1>
					</div>
					<h3 className="mt-8 text-lg font-semibold text-black">
						Choose Your Desired Locations
					</h3>
					<p className="mt-4 text-sm text-gray-600">
						Select all the locations where you plan to place your business.
					</p>
				</div>

				{/* Feature 3 */}
				<div className="flex flex-col items-center p-4 overflow-auto max-h-[400px]">
					<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
						<h1 className="font-bold text-lg">3</h1>
					</div>
					<h3 className="mt-8 text-lg font-semibold text-black">
						Explore the Options
					</h3>
					<p className="mt-4 text-sm text-gray-600">
						Once the analysis is complete, you will be presented with a list of
						ranked locations that match your business and sustainability values.
					</p>
				</div>
			</div>
		</div>
	);
}
