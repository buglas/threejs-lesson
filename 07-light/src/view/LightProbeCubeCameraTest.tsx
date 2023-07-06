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
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
	WebGLCubeRenderTarget,
} from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 0, 6)
const { scene, renderer } = stage

// probe
const lightProbe = new LightProbe()
scene.add(lightProbe)

// cube渲染目标
const cubeRenderTarget = new WebGLCubeRenderTarget(256)
// cube相机
const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget)

/* 贴图 */
const genCubeUrls = function (prefix: string, postfix: string) {
	return [
		prefix + 'px' + postfix,
		prefix + 'nx' + postfix,
		prefix + 'py' + postfix,
		prefix + 'ny' + postfix,
		prefix + 'pz' + postfix,
		prefix + 'nz' + postfix,
	]
}
const urls = genCubeUrls('textures/pisa/', '.png')

new CubeTextureLoader().load(urls, function (cubeTexture) {
	cubeTexture.encoding = sRGBEncoding
	scene.background = cubeTexture

	cubeCamera.update(renderer, scene)

	lightProbe.copy(
		LightProbeGenerator.fromCubeRenderTarget(renderer, cubeRenderTarget)
	)

	const mat = new MeshStandardMaterial({
		color: 0xffffff,
		roughness: 0,
		envMap: cubeTexture,
	})
	const sphereGeometry = new SphereGeometry(1, 36, 36)
	scene.add(new Mesh(sphereGeometry, mat))
})

{
	const mat = new MeshBasicMaterial({
		color: 0xffff00,
	})
	const sphereGeometry = new SphereGeometry(1, 9, 9)
	const mesh = new Mesh(sphereGeometry, mat)
	mesh.position.x = 2
	scene.add(mesh)
}

const LightProbeCubeCameraTest: React.FC = (): JSX.Element => {
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

export default LightProbeCubeCameraTest
