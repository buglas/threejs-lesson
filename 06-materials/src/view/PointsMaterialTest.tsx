import React, { useRef, useEffect } from 'react'

import {
	AmbientLight,
	BufferAttribute,
	CanvasTexture,
	Color,
	CubeRefractionMapping,
	CubeTextureLoader,
	DataTexture,
	DirectionalLight,
	DoubleSide,
	EquirectangularReflectionMapping,
	Fog,
	Mesh,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshPhongMaterial,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	MeshToonMaterial,
	NearestFilter,
	PlaneGeometry,
	RepeatWrapping,
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
	Vector2,
	RedFormat,
	LuminanceFormat,
	ShadowMaterial,
	MeshDepthMaterial,
	MathUtils,
	BufferGeometry,
	Float32BufferAttribute,
	PointsMaterial,
	Points,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 0, 10)
const { scene, renderer } = stage

const vertices = []
for (let i = 0; i < 20; i++) {
	const x = MathUtils.randFloatSpread(2)
	const y = MathUtils.randFloatSpread(2)
	const z = MathUtils.randFloatSpread(10)
	vertices.push(x, y, z)
}
const geometry = new BufferGeometry()
geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
const material = new PointsMaterial({
	color: 0x00acec,
	transparent: true,
	opacity: 0.5,
	size: 40,
	sizeAttenuation: false,
})
const points = new Points(geometry, material)
scene.add(points)

const PointsMaterialTest: React.FC = (): JSX.Element => {
	const divRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const { current } = divRef
		if (!current) {
			return
		}
		current.append(renderer.domElement)
		stage.animate()
		return () => {
			renderer.domElement.remove()
		}
	}, [])
	return <div ref={divRef} className="canvasWrapper"></div>
}

export default PointsMaterialTest
