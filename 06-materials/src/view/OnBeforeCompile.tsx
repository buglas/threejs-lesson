import React, { useRef, useEffect } from 'react'
import {
	Color,
	DirectionalLight,
	Mesh,
	MeshLambertMaterial,
	SphereGeometry,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, 0, 10)
const { renderer, scene } = stage
scene.background = new Color(0xffffff)

const geo = new SphereGeometry()
const mat = new MeshLambertMaterial()
mat.onBeforeCompile = function (shader) {
	shader.fragmentShader = `
      void main(){
			  gl_FragColor=vec4(0,0,1,1);
			}
  `
}
const mesh = new Mesh(geo, mat)
scene.add(mesh)

/* 灯光 */
const light = new DirectionalLight(0xffffff, 0.8)
light.position.set(10, 10, 10)
scene.add(light)

const OnBeforeCompile: React.FC = (): JSX.Element => {
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

export default OnBeforeCompile
