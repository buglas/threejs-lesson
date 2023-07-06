import React, { useRef, useEffect } from 'react'
import {
	AddOperation,
	AmbientLight,
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
	RectAreaLight,
	SphereGeometry,
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
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/* 快速初始化项目 */
const stage = new Stage(0, 1, -6)
const { scene, renderer } = stage
renderer.outputEncoding = sRGBEncoding

/* 灯光 */
const data = [
	[-1.5, 0xff0000],
	[0, 0x00ff00],
	[1.5, 0x0000ff],
]
data.forEach((ele) => {
	const rectLight = new RectAreaLight(ele[1], 1, 1, 2)
	rectLight.position.set(ele[0], 1, 0)
	scene.add(rectLight)
	const rectLightHelper = new RectAreaLightHelper(rectLight)
	rectLight.add(rectLightHelper)
})

/* 地面 */
{
	const geometry = new PlaneGeometry(2000, 2000)
	geometry.rotateX(-Math.PI / 2)
	const material = new MeshStandardMaterial({
		color: 0xeeeeee,
		roughness: 0.1,
		metalness: 0,
	})
	const plane = new Mesh(geometry, material)
	plane.receiveShadow = true
	scene.add(plane)
}

const RectarealightTest: React.FC = (): JSX.Element => {
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

export default RectarealightTest
