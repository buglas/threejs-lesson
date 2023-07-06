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

/* 快速初始化项目 */
const stage = new Stage(0, 0, 6)
const { scene, renderer } = stage

const textureLoader = new TextureLoader()
const textureFlare0 = textureLoader.load('/textures/lensflare/lensflare0.png')
const textureFlare3 = textureLoader.load('/textures/lensflare/lensflare3.png')

const light = new PointLight(0x00acec)
light.position.set(0, 0, 2)

scene.add(light)

const lensflare = new Lensflare()
lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color))
lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6))
lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7))
lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9))
lensflare.addElement(new LensflareElement(textureFlare3, 70, 1))
light.add(lensflare)

const LensflareTest: React.FC = (): JSX.Element => {
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

export default LensflareTest
