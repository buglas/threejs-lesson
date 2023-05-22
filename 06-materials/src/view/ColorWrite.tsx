import React, { useRef, useEffect } from 'react'
import {
	AmbientLight,
	BufferAttribute,
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
const stage = new Stage(0, 10, 20)
const { scene, renderer } = stage
renderer.shadowMap.enabled = true
renderer.setClearColor(0xffffff)

/* 球体 */
{
	const geometry = new SphereGeometry(1, 36, 36)
	const material = new MeshLambertMaterial({
		colorWrite: false,
	})
	const mesh = new Mesh(geometry, material)
	mesh.position.set(0, 1, 0)
	mesh.castShadow = true
	scene.add(mesh)
}

/* 平面-接收阴影 */
{
	const geometry = new PlaneGeometry(2000, 2000)
	geometry.rotateX(-Math.PI / 2)
	const material = new ShadowMaterial()
	const plane = new Mesh(geometry, material)
	plane.receiveShadow = true
	scene.add(plane)
}

/* 灯光 */
{
	const light = new DirectionalLight(0xffffff, 1)
	light.position.set(10, 10, 10)
	light.castShadow = true
	scene.add(light)
}

const ColorWrite: React.FC = (): JSX.Element => {
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

export default ColorWrite
