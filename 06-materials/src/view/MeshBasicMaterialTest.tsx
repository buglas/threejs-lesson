import React, { useRef, useEffect } from 'react'
import {
	AmbientLight,
	BufferAttribute,
	Color,
	CubeTextureLoader,
	DirectionalLight,
	DoubleSide,
	EquirectangularReflectionMapping,
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
const ballColorTexture = textureLoader.load('/textures/ball/color.jpg')
const ballAlphaTexture = textureLoader.load('/textures/ball/alpha.jpg')
const ballAmbientOcclusionTexture = textureLoader.load(
	'/textures/ball/ambientOcclusion.jpg'
)
const ballSpecularTexture = textureLoader.load('/textures/ball/specular.jpg')
const lightTexture = textureLoader.load('/textures/ball/light.jpg')
const shopTexture = textureLoader.load('/textures/environment/shop.jpg')
shopTexture.mapping = EquirectangularReflectionMapping

/* 几何体 */
const sphereGeometry = new SphereGeometry(1, 36, 36)
sphereGeometry.setAttribute(
	'uv2',
	new BufferAttribute(sphereGeometry.attributes.uv.array, 2)
)

/* 材质 */
const mat = new MeshBasicMaterial({
	// color: '#00acec',
})
// mat.color = new Color('#ff0000')
// mat.color.setHSL(0, 1, 0.5)
//16进制颜色
// mat.color.set(0xffff00)
//css颜色
// mat.color.set('#00ff00')
// mat.color.set('blue')
// mat.color.set('rgb(255,0,0)')
// mat.color.set('hsl(100,100%,50%)')
// 贴图
mat.map = ballColorTexture
//三角线
// mat.wireframe = true
// 开启透明度
mat.transparent = true
// 整体透明度
// mat.opacity = 0.5
// 透明贴图
// mat.alphaMap = ballAlphaTexture
// 双面
// mat.side = DoubleSide
// ao贴图
mat.aoMap = ballAmbientOcclusionTexture
// mat.aoMapIntensity = 0.5
// 灯光贴图
mat.lightMap = lightTexture
mat.lightMapIntensity = 1.3
// 环境贴图
mat.envMap = shopTexture
mat.reflectivity = 0.1
// 高光
// mat.specularMap = ballSpecularTexture

//球体
scene.add(new Mesh(sphereGeometry, mat))

const MeshBasicMaterialTest: React.FC = (): JSX.Element => {
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

export default MeshBasicMaterialTest
