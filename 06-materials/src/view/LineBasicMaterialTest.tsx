import React, { useRef, useEffect } from 'react'

import {
	BufferGeometry,
	Float32BufferAttribute,
	LineBasicMaterial,
	Line,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 0, 10)
const { scene, renderer } = stage

const vertices = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0]
const geometry = new BufferGeometry()
geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
const material = new LineBasicMaterial({
	color: 0x00acec,
	linewidth: 20,
})
const line = new Line(geometry, material)

scene.add(line)

const LineBasicMaterialTest: React.FC = (): JSX.Element => {
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

export default LineBasicMaterialTest
