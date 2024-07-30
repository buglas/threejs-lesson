import React, { useRef, useEffect } from 'react'
import {
	Mesh,
	PlaneGeometry,
	SphereGeometry,
	MeshDepthMaterial,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 2, 6)
const { scene, renderer, camera } = stage
renderer.setClearColor(0xaaaaaa)
camera.near = 3
camera.far = 20
camera.lookAt(0, 1, 0)

/* 球体 */
{
	const geometry = new SphereGeometry(1, 36, 36)
	const material = new MeshDepthMaterial()
	const mesh = new Mesh(geometry, material)
	mesh.position.set(0, 1, 0)
	scene.add(mesh)
}

/* 平面 */
{
	const geometry = new PlaneGeometry(2000, 2000)
	geometry.rotateX(-Math.PI / 2)
	const material = new MeshDepthMaterial()
	const plane = new Mesh(geometry, material)
	scene.add(plane)
}

const MeshDepthMaterialTest: React.FC = (): JSX.Element => {
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

export default MeshDepthMaterialTest
