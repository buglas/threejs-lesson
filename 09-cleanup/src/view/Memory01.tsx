import React, { useRef, useEffect } from 'react'
import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	SRGBColorSpace,
	TextureLoader,
	WebGLRenderer,
} from 'three'
import { ResourceTracker } from '../component/ResourceTracker'
import './fullScreen.css'

const renderer = new WebGLRenderer({ antialias: true })
renderer.setPixelRatio(devicePixelRatio)
const camera = new PerspectiveCamera(60, 2,  0.1, 5)
camera.position.set(2,2,2)
camera.lookAt(0,0,0)
const scene = new Scene()
const resTracker = new ResourceTracker()
const geometry = new BoxGeometry(1, 1, 1)
// resTracker.track(geometry)
const loader = new TextureLoader()
const texture = loader.load(
	'https://threejs.org/manual/examples/resources/images/wall.jpg'
)
texture.colorSpace = SRGBColorSpace
// resTracker.track(texture)
const material = new MeshBasicMaterial({
	map: texture,
})
// resTracker.track(material)
const cube = new Mesh(geometry, material)
// resTracker.track(cube)
scene.add(cube)

resTracker.track(scene)
// resTracker.dispose()

function responsive(current:HTMLDivElement) {
  const {clientWidth,clientHeight}=current
  renderer.setSize(clientWidth,clientHeight)
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
}



const Memory01: React.FC = (): JSX.Element => {
	const divRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const { current } = divRef
		if (!current) {
			return
		}
		current.append(renderer.domElement)
    responsive(current)
    renderer.render(scene,camera)
		return () => {
			renderer.domElement.remove()
		}
	}, [])
	return <div ref={divRef} className="canvasWrapper"></div>
}

export default Memory01
