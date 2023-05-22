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
	PlaneGeometry,
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 3, 6)
const { scene, renderer } = stage
// 背景色
renderer.setClearColor(0xaaaaaa)

/* 贴图 */
const textureLoader = new TextureLoader()
const marbleTexture = textureLoader.load('/textures/stone/marble-01.jpg')

/* 几何体 */
const sphereGeometry = new SphereGeometry(1, 36, 36)

/* 材质 */
const mat = new MeshPhongMaterial()
// 高光大小
mat.shininess = 60
// 高光颜色
// mat.specular = new Color(0x00acec)
// 高光贴图
mat.specularMap = marbleTexture

scene.add(new Mesh(sphereGeometry, mat))

/* 灯光 */
const light = new DirectionalLight(0xffffff, 0.8)
light.position.set(10, 10, 10)
scene.add(light)

const MeshPhongMaterialTest: React.FC = (): JSX.Element => {
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

export default MeshPhongMaterialTest
