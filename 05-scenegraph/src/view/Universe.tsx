import React, { useRef, useEffect } from 'react'
import {
	BoxGeometry,
	BufferGeometry,
	CircleGeometry,
	ConeGeometry,
	CylinderGeometry,
	DirectionalLight,
	DodecahedronGeometry,
	EdgesGeometry,
	Group,
	IcosahedronGeometry,
	Material,
	Mesh,
	MeshBasicMaterial,
	MeshNormalMaterial,
	MeshPhongMaterial,
	Object3D,
	OctahedronGeometry,
	PerspectiveCamera,
	PlaneGeometry,
	PointLight,
	PolyhedronGeometry,
	RingGeometry,
	Scene,
	Shape,
	ShapeGeometry,
	SphereGeometry,
	WebGLRenderer,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'
import AxesGridHelper from '../component/AxesGridHelper'
import { GUI } from 'dat.gui'

const stage = new Stage()
const { scene, renderer, camera } = stage

// 设置相机的视点位、目标点和上方向，使其变成俯视状态
camera.position.set(0, 20, 0)
camera.up.set(0, 0, -1)
camera.lookAt(0, 0, 0)

// 点光源
const color = 0xffffff
const intensity = 3
const light = new PointLight(color, intensity)
scene.add(light)

// 太阳、地球和月亮都共用一个球体
const radius = 1
const widthSegments = 6
const heightSegments = 6
const sphereGeometry = new SphereGeometry(radius, widthSegments, heightSegments)

//需要旋转的对象集合
const objects: Object3D[] = []

// 太阳坐标系
const solarSystem = new Group()
scene.add(solarSystem)
objects.push(solarSystem)

// 地球坐标系
const earthSystem = new Group()
earthSystem.position.x = 5
solarSystem.add(earthSystem)
objects.push(earthSystem)

// 月球坐标系
const moonSystem = new Group()
moonSystem.position.x = 2
earthSystem.add(moonSystem)
objects.push(moonSystem)

//  太阳
const sunMaterial = new MeshPhongMaterial({ emissive: 0xffff00 })
const sunMesh = new Mesh(sphereGeometry, sunMaterial)
solarSystem.add(sunMesh)

// 地球
const earthMaterial = new MeshPhongMaterial({
	color: 0x2233ff,
	emissive: 0x112244,
})
const earthMesh = new Mesh(sphereGeometry, earthMaterial)
earthMesh.scale.set(0.5, 0.5, 0.5)
earthSystem.add(earthMesh)

// 月球
const moonMaterial = new MeshPhongMaterial({
	color: 0x999999,
	emissive: 0x999999,
})
const moonMesh = new Mesh(sphereGeometry, moonMaterial)
moonMesh.scale.set(0.2, 0.2, 0.2)
moonSystem.add(moonMesh)

// 辅助对象
/* objects.forEach((obj) => {
	new AxesGridHelper(obj)
})
 */
// 渲染之前
stage.beforeRender = (time = 0) => {
	time *= 0.001
	objects.forEach((obj) => {
		obj.rotation.y = time
	})
}

// 调试
const gui = new GUI({ autoPlace: false })
makeAxesGrid(solarSystem, 'solarSystem')
makeAxesGrid(earthSystem, 'earthSystem')
makeAxesGrid(moonSystem, 'moonSystem')
function makeAxesGrid(obj: Object3D, label: string) {
	const helper = new AxesGridHelper(obj)
	gui.add(helper, 'visible').name(label)
}

const Universe: React.FC = (): JSX.Element => {
	const divRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const { current } = divRef
		if (current) {
			current.innerHTML = ''
			current.append(renderer.domElement)
			current.append(gui.domElement)
			stage.animate()
		}
	}, [])
	return <div ref={divRef} className="canvasWrapper"></div>
}

export default Universe
