import React, { useRef, useEffect } from "react"
import {
	BufferGeometry,
	EdgesGeometry,
	LineBasicMaterial,
	LineSegments,
	Mesh,
	MeshNormalMaterial,
} from "three"
import Stage from "../component/Stage"
import WaveBall from "../component/WaveBall"
import "./fullScreen.css"

const stage = new Stage(5, 3, 0)
const { scene, renderer } = stage
const geometry = new WaveBall(60, 60)
geometry.wave()

stage.beforeRender = (time = 0) => {
	geometry.wave(time * 0.002)
}
{
	const material = new MeshNormalMaterial({
		polygonOffset: true,
		polygonOffsetFactor: 1,
		polygonOffsetUnits: 1,
	})
	const mesh = new Mesh(geometry, material)
	scene.add(mesh)
}
const UpdateGeo: React.FC = (): JSX.Element => {
	const divRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const { current } = divRef
		if (current) {
			current.innerHTML = ""
			current.append(renderer.domElement)
			stage.animate()
		}
	}, [])
	return <div ref={divRef} className="canvasWrapper"></div>
}

export default UpdateGeo
