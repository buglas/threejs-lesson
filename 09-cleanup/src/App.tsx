import React, { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import Home from './view/Home'
import Memory03 from './view/Memory03'
const Memory01 = lazy(()=>import('./view/Memory01'))
const Memory02 = lazy(()=>import('./view/Memory02'))
const UseEffectTest = lazy(()=>import('./view/UseEffectTest'))

const App: React.FC = (): JSX.Element => {
	const routing = useRoutes([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: 'Memory01',
			element: <Suspense><Memory01 /></Suspense>,
		},
		{
			path: 'Memory02',
			element: <Suspense><Memory02 /></Suspense>,
		},
		{
      path: 'Memory03',
			element: <Memory03 />,
		},
    {
      path: 'UseEffectTest',
      element: <Suspense><UseEffectTest /></Suspense>,
    },
	])
	return <>{routing}</>
}

export default App
