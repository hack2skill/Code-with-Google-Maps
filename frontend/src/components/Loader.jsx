import { ScaleLoader } from "react-spinners";

const Loader = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<ScaleLoader size={15} />
		</div>
	);
};

export default Loader;
