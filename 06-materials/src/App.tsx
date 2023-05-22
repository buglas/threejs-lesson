import React from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import LineBasicMaterialTest from './view/LineBasicMaterialTest'
import LineDashedMaterialTest from './view/LineDashedMaterialTest'
import Materials from './view/Materials'
import MeshBasicMaterialTest from './view/MeshBasicMaterialTest'
import MeshDepthMaterialTest from './view/MeshDepthMaterialTest'
import MeshLambertMaterialTest from './view/MeshLambertMaterialTest'
import MeshPhongMaterialTest from './view/MeshPhongMaterialTest'
import MeshPhysicalMaterialTest from './view/MeshPhysicalMaterialTest'
import MeshStandardMaterialTest from './view/MeshStandardMaterialTest'
import MeshToonMaterialTest from './view/MeshToonMaterialTest'
import PointsMaterialTest from './view/PointsMaterialTest'
import ShadowMaterialTest from './view/ShadowMaterialTest'
import SpriteMaterialTest from './view/SpriteMaterialTest'
import Alpha from './view/Alpha'
import Clip from './view/Clip'
import StencilTest_SigleSection from './view/StencilTest_SigleSection'
import StencilTest_MultiSection from './view/StencilTest_MultiSection'
import BlendTest from './view/BlendTest'
import ColorWrite from './view/ColorWrite'
import VertextColors from './view/VertextColors'
import OnBeforeCompile from './view/OnBeforeCompile'
import ShaderMaterialTest from './view/ShaderMaterialTest'

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
		{
			path: 'MeshLambertMaterialTest',
			element: <MeshLambertMaterialTest />,
		},
		{
			path: 'MeshPhongMaterialTest',
			element: <MeshPhongMaterialTest />,
		},
		{
			path: 'MeshStandardMaterialTest',
			element: <MeshStandardMaterialTest />,
		},
		{
			path: 'MeshPhysicalMaterialTest',
			element: <MeshPhysicalMaterialTest />,
		},
		{
			path: 'MeshToonMaterialTest',
			element: <MeshToonMaterialTest />,
		},
		{
			path: 'ShadowMaterialTest',
			element: <ShadowMaterialTest />,
		},
		{
			path: 'MeshDepthMaterialTest',
			element: <MeshDepthMaterialTest />,
		},
		{
			path: 'PointsMaterialTest',
			element: <PointsMaterialTest />,
		},
		{
			path: 'LineBasicMaterialTest',
			element: <LineBasicMaterialTest />,
		},
		{
			path: 'LineDashedMaterialTest',
			element: <LineDashedMaterialTest />,
		},
		{
			path: 'SpriteMaterialTest',
			element: <SpriteMaterialTest />,
		},
		{
			path: 'Alpha',
			element: <Alpha />,
		},
		{
			path: 'Clip',
			element: <Clip />,
		},
		{
			path: 'BlendTest',
			element: <BlendTest />,
		},
		{
			path: 'StencilTest_SigleSection',
			element: <StencilTest_SigleSection />,
		},
		{
			path: 'StencilTest_MultiSection',
			element: <StencilTest_MultiSection />,
		},
		{
			path: 'ColorWrite',
			element: <ColorWrite />,
		},
		{
			path: 'VertextColors',
			element: <VertextColors />,
		},
		{
			path: 'OnBeforeCompile',
			element: <OnBeforeCompile />,
		},
		{
			path: 'ShaderMaterialTest',
			element: <ShaderMaterialTest />,
		},
	])
	return <>{routing}</>
}

export default App
