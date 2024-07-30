import React, { useRef, useEffect } from 'react'

import {
	BufferGeometry,
	Float32BufferAttribute,
	Line,
	LineDashedMaterial,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 0, 10)
const { scene, renderer } = stage

const vertices = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0]
const geometry = new BufferGeometry()
geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
const material = new LineDashedMaterial({
	color: 0xffffff,
	// 实线长度
	dashSize: 0.2,
	// 虚线长度
	gapSize: 0.2,
	// 缩放
	scale: 2,
})
const line = new Line(geometry, material)
// 计算起点到每一个顶点的距离集合
line.computeLineDistances()
// [0,2,4,6]

scene.add(line)

const LineDashedMaterialTest: React.FC = (): JSX.Element => {
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

export default LineDashedMaterialTest
