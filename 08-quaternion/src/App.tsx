import React, { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import Home from './view/Home'

const Rotate01 = lazy(()=>import('./view/Rotate01'))
const Rotate02 = lazy(()=>import('./view/Rotate02'))
const Rotate03 = lazy(()=>import('./view/Rotate03'))
const Rotate04 = lazy(()=>import('./view/Rotate04'))

const App: React.FC = (): JSX.Element => {
	const routing = useRoutes([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: 'Rotate01',
			element: <Suspense><Rotate01 /></Suspense>,
		},
		{
			path: 'Rotate02',
			element: <Suspense><Rotate02 /></Suspense>,
		},
    {
			path: 'Rotate03',
			element: <Suspense><Rotate03 /></Suspense>,
		},
    {
			path: 'Rotate04',
			element: <Suspense><Rotate04 /></Suspense>,
		},
	])
	return <>{routing}</>
}

export default App
