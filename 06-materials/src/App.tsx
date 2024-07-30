import React, { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import Home from './view/Home'

const LineBasicMaterialTest = lazy(()=>import('./view/LineBasicMaterialTest'))
const LineDashedMaterialTest = lazy(()=>import('./view/LineDashedMaterialTest'))
const MeshBasicMaterialTest = lazy(()=>import('./view/MeshBasicMaterialTest'))
const MeshDepthMaterialTest = lazy(()=>import('./view/MeshDepthMaterialTest'))
const MeshLambertMaterialTest = lazy(()=>import('./view/MeshLambertMaterialTest'))
const MeshPhongMaterialTest = lazy(()=>import('./view/MeshPhongMaterialTest'))
const MeshPhysicalMaterialTest = lazy(()=>import('./view/MeshPhysicalMaterialTest'))
const MeshStandardMaterialTest = lazy(()=>import('./view/MeshStandardMaterialTest'))
const MeshToonMaterialTest = lazy(()=>import('./view/MeshToonMaterialTest'))
const PointsMaterialTest = lazy(()=>import('./view/PointsMaterialTest'))
const ShadowMaterialTest = lazy(()=>import('./view/ShadowMaterialTest'))
const SpriteMaterialTest = lazy(()=>import('./view/SpriteMaterialTest'))
const Alpha = lazy(()=>import('./view/Alpha'))
const Clip = lazy(()=>import('./view/Clip'))
const StencilTest_SigleSection = lazy(()=>import('./view/StencilTest_SigleSection'))
const StencilTest_MultiSection = lazy(()=>import('./view/StencilTest_MultiSection'))
const BlendTest = lazy(()=>import('./view/BlendTest'))
const ColorWrite = lazy(()=>import('./view/ColorWrite'))
const VertextColors = lazy(()=>import('./view/VertextColors'))
const OnBeforeCompile = lazy(()=>import('./view/OnBeforeCompile'))
const ShaderMaterialTest = lazy(()=>import('./view/ShaderMaterialTest'))

const App: React.FC = (): JSX.Element => {
	const routing = useRoutes([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: 'MeshBasicMaterialTest',
			element: <Suspense><MeshBasicMaterialTest /></Suspense>,
		},
		{
			path: 'MeshLambertMaterialTest',
			element: <Suspense> <MeshLambertMaterialTest/></Suspense>,
		},
		{
			path: 'MeshPhongMaterialTest',
			element: <Suspense> <MeshPhongMaterialTest/></Suspense>,
		},
		{
			path: 'MeshStandardMaterialTest',
			element: <Suspense> <MeshStandardMaterialTest/></Suspense>,
		},
		{
			path: 'MeshPhysicalMaterialTest',
			element: <Suspense> <MeshPhysicalMaterialTest/></Suspense>,
		},
		{
			path: 'MeshToonMaterialTest',
			element: <Suspense> <MeshToonMaterialTest/></Suspense>,
		},
		{
			path: 'ShadowMaterialTest',
			element: <Suspense> <ShadowMaterialTest/></Suspense>,
		},
		{
			path: 'MeshDepthMaterialTest',
			element: <Suspense> <MeshDepthMaterialTest/></Suspense>,
		},
		{
			path: 'PointsMaterialTest',
			element: <Suspense> <PointsMaterialTest/></Suspense>,
		},
		{
			path: 'LineBasicMaterialTest',
			element: <Suspense> <LineBasicMaterialTest/></Suspense>,
		},
		{
			path: 'LineDashedMaterialTest',
			element: <Suspense> <LineDashedMaterialTest/></Suspense>,
		},
		{
			path: 'SpriteMaterialTest',
			element: <Suspense> <SpriteMaterialTest/></Suspense>,
		},
		{
			path: 'Alpha',
			element: <Suspense> <Alpha/></Suspense>,
		},
		{
			path: 'Clip',
			element: <Suspense> <Clip/></Suspense>,
		},
		{
			path: 'BlendTest',
			element: <Suspense> <BlendTest/></Suspense>,
		},
		{
			path: 'StencilTest_SigleSection',
			element: <Suspense> <StencilTest_SigleSection/></Suspense>,
		},
		{
			path: 'StencilTest_MultiSection',
			element: <Suspense> <StencilTest_MultiSection/></Suspense>,
		},
		{
			path: 'ColorWrite',
			element: <Suspense> <ColorWrite/></Suspense>,
		},
		{
			path: 'VertextColors',
			element: <Suspense> <VertextColors/></Suspense>,
		},
		{
			path: 'OnBeforeCompile',
			element: <Suspense> <OnBeforeCompile/></Suspense>,
		},
		{
			path: 'ShaderMaterialTest',
			element: <Suspense> <ShaderMaterialTest/></Suspense>,
		},
	])
	return <>{routing}</>
}

export default App
