import React from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import Materials from './view/Materials'
import MeshBasicMaterialTest from './view/MeshBasicMaterialTest'

const App: React.FC = (): JSX.Element => {
	const routing = useRoutes([
		{
			path: '/',
			element: <Materials />,
		},
		{
			path: 'MeshBasicMaterialTest',
			element: <MeshBasicMaterialTest />,
		},
	])
	return <>{routing}</>
}

export default App
