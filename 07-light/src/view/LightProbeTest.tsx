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
	lightProbe.copy(LightProbeGenerator.fromCubeTexture(cubeTexture))

	/* 材质 */
	const mat = new MeshStandardMaterial({
		color: 0xffffff,
		roughness: 0,
		envMap: cubeTexture,
		envMapIntensity: 2,
	})
	/* 几何体 */
	const sphereGeometry = new SphereGeometry(1, 36, 36)

	//球体
	scene.add(new Mesh(sphereGeometry, mat))
})

const LightProbeTest: React.FC = (): JSX.Element => {
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

export default LightProbeTest
