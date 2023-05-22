import React, { useRef, useEffect } from 'react'
import {
	AmbientLight,
	BufferAttribute,
	BufferGeometry,
	Color,
	CubeRefractionMapping,
	CubeTextureLoader,
	DirectionalLight,
	DoubleSide,
	EquirectangularReflectionMapping,
	Fog,
	Mesh,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshPhongMaterial,
	MeshStandardMaterial,
	PlaneGeometry,
	ShadowMaterial,
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
	Vector2,
} from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 0, 10)
const { renderer, scene } = stage

/* 顶点 */
const vertices = new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0])
/* 颜色 */
const colors = new Float32Array([0, 1, 0, 1, 1, 0, 1, -1, 0])
/* 自定义几何体 */
const geo = new BufferGeometry()
geo.setAttribute('position', new BufferAttribute(vertices, 3))
geo.setAttribute('color', new BufferAttribute(colors, 3))
/* 材质-顶点着色 */
const mat = new MeshBasicMaterial({
	color: 0xffffff,
	vertexColors: true,
})
const mesh = new Mesh(geo, mat)
scene.add(mesh)

const VertextColors: React.FC = (): JSX.Element => {
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

export default VertextColors
