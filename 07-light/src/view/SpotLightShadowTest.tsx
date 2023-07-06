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
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(40, 25, 35)
const { scene, renderer } = stage
renderer.shadowMap.enabled = true

/* 灯光 */
{
	const light = new SpotLight()
	light.position.set(0, 6, 2)
	light.castShadow = true
	// 投影
	const {
		shadow: { mapSize, camera },
	} = light
	mapSize.width = 512 // default
	mapSize.height = 512 // default
	camera.near = 0.5 // default
	camera.far = 50 // default

	scene.add(light)
}

/* 柱子 */
for (let z = 0; z < 2; z++) {
	for (let x = 0; x < 2; x++) {
		const mat = new MeshStandardMaterial({
			color: 0xeeeeee,
		})
		const geo = new BoxGeometry(1, 4, 1)
		const mesh = new Mesh(geo, mat)
		mesh.position.y = 2
		mesh.position.x = x * 4 - 2
		mesh.position.z = z * 4 - 2
		mesh.castShadow = true
		scene.add(mesh)
	}
}

/* 地面 */
{
	const geometry = new PlaneGeometry(2000, 2000)
	geometry.rotateX(-Math.PI / 2)
	const material = new MeshStandardMaterial()
	const plane = new Mesh(geometry, material)
	plane.receiveShadow = true
	scene.add(plane)
}

const PointLightShadowTest: React.FC = (): JSX.Element => {
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

export default PointLightShadowTest
