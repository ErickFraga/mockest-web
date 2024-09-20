import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreatePage from "./create";
import MockPage from "./mock";

const router = createBrowserRouter([
	{
		path: "/",
		element: <CreatePage />,
	},
	{
		path: "/mock/:slug",
		element: <MockPage />,
	},
]);

function MainRouter() {
	return <RouterProvider router={router} />;
}

export default MainRouter;
