import React from "react"
import { useRoutes } from "react-router-dom"
import "./App.css"
import SceneGraph from "./view/SceneGraph"
import Universe from "./view/Universe"
import Tank from "./view/Tank"

const App: React.FC = (): JSX.Element => {
	const routing = useRoutes([
		{
			path: "/",
			element: <SceneGraph />,
		},
		{
			path: "Universe",
			element: <Universe />,
		},
		{
			path: "Tank",
			element: <Tank />,
		},
	])
	return <>{routing}</>
}

export default App
