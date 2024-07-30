import React, { useRef, useEffect } from 'react'
import {
	DataTexture,
	DirectionalLight,
	Mesh,
	MeshToonMaterial,
	SphereGeometry,
	RedFormat,
	LuminanceFormat,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(-6, 3, 6)
const { scene, renderer } = stage
// 背景色
renderer.setClearColor(0xaaaaaa)

const format = renderer.capabilities.isWebGL2 ? RedFormat : LuminanceFormat
const colors = new Uint8Array(3)
for (let c = 0; c <= colors.length; c++) {
	colors[c] = (c / colors.length) * 256
}
const gradientMap = new DataTexture(colors, colors.length, 1, format)
gradientMap.needsUpdate = true

/* 几何体 */
const sphereGeometry = new SphereGeometry(1, 36, 36)

/* 材质 */
const mat = new MeshToonMaterial()
// 渐变贴图
mat.gradientMap = gradientMap
// 颜色
mat.color.set(0x00acec)

scene.add(new Mesh(sphereGeometry, mat))

/* 灯光 */
const light = new DirectionalLight(0xffffff, 0.5)
light.position.set(10, 10, 10)
scene.add(light)

const MeshToonMaterialTest: React.FC = (): JSX.Element => {
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

export default MeshToonMaterialTest
