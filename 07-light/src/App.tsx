import React from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import Light from './view/Light'
import LightProbeTest from './view/LightProbeTest'
import LightProbeCubeCameraTest from './view/LightProbeCubeCameraTest'
import DirectionalLightShadowTest from './view/DirectionalLightShadowTest'
import PointLightShadowTest from './view/PointLightShadowTest'
import SpotLightShadowTest from './view/SpotLightShadowTest'
import LensflareTest from './view/LensflareTest'
import SpotLightTest from './view/SpotLightTest'
import RectarealightTest from './view/RectarealightTest'

const App: React.FC = (): JSX.Element => {
	const routing = useRoutes([
		{
			path: '/',
			element: <Light />,
		},

		{
			path: 'DirectionalLightShadowTest',
			element: <DirectionalLightShadowTest />,
		},
		{
			path: 'PointLightShadowTest',
			element: <PointLightShadowTest />,
		},
		{
			path: 'SpotLightShadowTest',
			element: <SpotLightShadowTest />,
		},
		{
			path: 'LightProbe',
			element: <LightProbeTest />,
		},
		{
			path: 'LightProbeCubeCameraTest',
			element: <LightProbeCubeCameraTest />,
		},
		{
			path: 'LensflareTest',
			element: <LensflareTest />,
		},
		{
			path: 'SpotLightTest',
			element: <SpotLightTest />,
		},
		{
			path: 'RectarealightTest',
			element: <RectarealightTest />,
		},
	])
	return <>{routing}</>
}

export default App
