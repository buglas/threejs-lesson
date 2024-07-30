import React, { useRef, useEffect } from 'react'
import {
	AddOperation,
	AmbientLight,
	BoxGeometry,
	BufferAttribute,
	Color,
	CubeCamera,
	CubeTextureLoader,
	DirectionalLight,
	DoubleSide,
	EquirectangularReflectionMapping,
	Fog,
	LightProbe,
	Mesh,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshPhongMaterial,
	MeshStandardMaterial,
	MixOperation,
	MultiplyOperation,
	PlaneGeometry,
	PointLight,
	SphereGeometry,
	SpotLight,
	sRGBEncoding,
	TextureLoader,
	WebGLCubeRenderTarget,
} from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator'
import {
	Lensflare,
	LensflareElement,
} from 'three/examples/jsm/objects/Lensflare.js'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(6, 6, 3)
const { scene, renderer } = stage
renderer.shadowMap.enabled = true

/* 灯光 */
{
	const light = new SpotLight(0x00acec)
	light.position.set(2, 5, 3)
	light.castShadow = true
	light.angle = 0.3
	light.penumbra = 0.5

	light.decay = 2
	light.distance = 50
	// 投影
	const {
		shadow: { mapSize, camera },
	} = light
	mapSize.width = 512 // default
	mapSize.height = 512 // default
	camera.near = 1 // default
	camera.far = 10 // default

	scene.add(light)
}

/* 柱子 */
const mat = new MeshStandardMaterial({
	color: 0xeeeeee,
})
const geo = new BoxGeometry(1, 0.5, 1)
const mesh = new Mesh(geo, mat)
mesh.position.set(0, 1, 0)
mesh.castShadow = true
scene.add(mesh)

/* 地面 */
{
	const geometry = new PlaneGeometry(2000, 2000)
	geometry.rotateX(-Math.PI / 2)
	const material = new MeshStandardMaterial()
	const plane = new Mesh(geometry, material)
	plane.receiveShadow = true
	scene.add(plane)
}

const SpotLightTest: React.FC = (): JSX.Element => {
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

export default SpotLightTest
