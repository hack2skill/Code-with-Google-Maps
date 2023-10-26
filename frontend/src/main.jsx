import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Hero from "../src/components/Hero";
import "./App.css";
import Error from "./components/Error";
import Features from "./components/Features";
import Form from "./components/Form";
import Map from "./components/Map";

const AppLayout = () => {
	return (
		<>
			<Hero />
			<Features />
		</>
	);
};

const appRouter = createBrowserRouter([
	{
		path: "/form",
		element: <Form />,
	},
	{
		path: "/map",
		element: <Map />,
	},
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <Error />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
