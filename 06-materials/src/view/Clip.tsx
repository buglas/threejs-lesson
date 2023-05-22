import React, { useRef, useEffect } from 'react'
import {
	AddOperation,
	AmbientLight,
	BufferAttribute,
	Color,
	CubeTextureLoader,
	DirectionalLight,
	DoubleSide,
	EquirectangularReflectionMapping,
	Fog,
	Mesh,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshPhongMaterial,
	MixOperation,
	MultiplyOperation,
	Plane,
	PlaneGeometry,
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
	Vector3,
} from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 4, 8)
const { scene, renderer } = stage

renderer.setClearColor(0xaaaaaa)
renderer.localClippingEnabled = true
renderer.shadowMap.enabled = true

/* 贴图 */
const textureLoader = new TextureLoader()
const ballColorTexture = textureLoader.load('/textures/ball/color.jpg')
const lightTexture = textureLoader.load('/textures/ball/light.jpg')

/* 球体 */
const clippingPlanes = [
	new Plane(new Vector3(0, -1, 0), 0.5),
	new Plane(new Vector3(1, 0, 1), 0.5),
]
const sphereGeometry = new SphereGeometry(1, 36, 36)
sphereGeometry.setAttribute('uv2', sphereGeometry.attributes.uv)
const mat = new MeshLambertMaterial({
	map: ballColorTexture,
	lightMap: lightTexture,
	lightMapIntensity: 0.8,
	side: DoubleSide,
	clippingPlanes,
	// clipIntersection: true,
	clipShadows: true,
})
const sphere = new Mesh(sphereGeometry, mat)
sphere.castShadow = true

scene.add(sphere)

/* 地面 */
{
	const geometry = new PlaneGeometry(2000, 2000)
	geometry.rotateX(-Math.PI / 2)
	const material = new MeshLambertMaterial({
		color: 0xffffff,
	})
	const plane = new Mesh(geometry, material)
	plane.receiveShadow = true
	plane.position.y = -1
	scene.add(plane)
}

/* 灯光 */
{
	const light = new DirectionalLight(0xffffff, 0.8)
	light.position.set(5, 10, 5)
	light.castShadow = true
	scene.add(light)
}

const Clip: React.FC = (): JSX.Element => {
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

export default Clip
