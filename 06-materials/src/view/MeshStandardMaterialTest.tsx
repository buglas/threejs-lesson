import React, { useRef, useEffect } from 'react'
import {
	Color,
	EquirectangularReflectionMapping,
	Mesh,
	MeshStandardMaterial,
	SphereGeometry,
	TextureLoader,
} from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 3, 6)
const { scene, renderer } = stage
// 背景色
renderer.setClearColor(0xaaaaaa)

/* 环境光 */
new RGBELoader().loadAsync('/textures/environment/shop.hdr').then((texture) => {
	texture.mapping = EquirectangularReflectionMapping
	scene.environment = texture
})

/* 贴图 */
const textureLoader = new TextureLoader()
const ballMetalnessTexture = textureLoader.load('/textures/ball/metalness.jpg')
const ballBumpTexture = textureLoader.load('/textures/ball/bump.jpg')
const ballDisplacementTexture = textureLoader.load(
	'/textures/ball/displacement.jpg'
)
const ballNormalTexture = textureLoader.load('/textures/ball/normal.jpg')
const marbleTexture = textureLoader.load('/textures/stone/marble-01.jpg')

/* 几何体 */
const sphereGeometry = new SphereGeometry(1, 36, 36)

/* 材质 */
const mat = new MeshStandardMaterial({ color: 0xaaaaaa })
// 发光
mat.emissive=new Color(0x00acec)
mat.emissiveIntensity=0.3
// 光泽度
mat.roughness = 0.567
// 金属度
// mat.metalness = 1
// 金属度贴图
// mat.metalnessMap = ballMetalnessTexture
// 凹凸贴图
// mat.bumpMap = ballBumpTexture
// mat.bumpMap = marbleTexture
// mat.bumpScale = 0.02
// 位移贴图
// mat.displacementMap = ballDisplacementTexture
// mat.displacementScale = 0.2
// 是否平面着色
// mat.flatShading = true
// 法线贴图
// mat.normalMap = ballNormalTexture
// mat.normalScale = new Vector2(0.2, 0.2)

scene.add(new Mesh(sphereGeometry, mat))

/* 灯光 */
/* const light = new DirectionalLight(0xffffff, 0.5)
light.position.set(10, 10, 10)
scene.add(light) */

const MeshStandardMaterialTest: React.FC = (): JSX.Element => {
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

export default MeshStandardMaterialTest
