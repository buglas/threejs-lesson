import React, { useRef, useEffect } from 'react'

import {
	AmbientLight,
	BufferAttribute,
	CanvasTexture,
	Color,
	CubeRefractionMapping,
	CubeTextureLoader,
	DataTexture,
	DirectionalLight,
	DoubleSide,
	EquirectangularReflectionMapping,
	Fog,
	Mesh,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshPhongMaterial,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	MeshToonMaterial,
	NearestFilter,
	PlaneGeometry,
	RepeatWrapping,
	SphereGeometry,
	sRGBEncoding,
	TextureLoader,
	Vector2,
	RedFormat,
	LuminanceFormat,
	ShadowMaterial,
	MeshDepthMaterial,
	MathUtils,
	BufferGeometry,
	Float32BufferAttribute,
	PointsMaterial,
	Points,
	LineBasicMaterial,
	LineSegments,
	Line,
	LineDashedMaterial,
	SpriteMaterial,
	Sprite,
	Texture,
	Group,
	OneFactor,
	CustomBlending,
	OneMinusSrcAlphaFactor,
	SrcAlphaFactor,
	DstAlphaFactor,
	AdditiveBlending,
	Vector3,
	Plane,
	BackSide,
	BoxGeometry,
	AlwaysStencilFunc,
	IncrementWrapStencilOp,
	DecrementWrapStencilOp,
	FrontSide,
	EqualStencilFunc,
	Object3D,
	Raycaster,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'
import { randFloatSpread } from 'three/src/math/MathUtils'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/* 快速初始化项目 */
const stage = new Stage(5, 8, 10)
const { scene, renderer, controls, camera } = stage
renderer.localClippingEnabled = true
renderer.shadowMap.enabled = true
camera.near = 1
camera.far = 50
controls.target.set(0, 0, 0)
controls.update()
// 背景色
renderer.setClearColor(0xdddddd)

/* 楼房 */
const building = new Group()
scene.add(building)

for (let y = -10; y < 10; y++) {
	for (let x = -10; x < 10; x++) {
		const dist = x * x + y * y
		const w = (Math.cos(x) * 0.5 + 0.5) * 0.3 + 0.3
		const h = (Math.cos(dist * 0.15) * 0.5 + 0.5) * 0.8 + 0.8
		const d = (Math.cos(y) * 0.5 + 0.5) * 0.3 + 0.3
		const geo = new BoxGeometry(w, h, d)
		const mat = new MeshStandardMaterial({ color: 0xdddddd })
		const mesh = new Mesh(geo, mat)
		mesh.position.set(x, h / 2, y)
		mesh.castShadow = true
		mesh.receiveShadow = true
		building.add(mesh)
	}
}

/* 地面 */
{
	const geometry = new PlaneGeometry(2000, 2000)
	geometry.rotateX(-Math.PI / 2)
	const material = new MeshLambertMaterial({
		color: 0x666666,
	})
	const plane = new Mesh(geometry, material)
	plane.receiveShadow = true
	scene.add(plane)
}

const pointer = new Vector2()
const raycaster = new Raycaster()
/* 鼠标移动 */
function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	/* console.log(event.clientX, event.clientY)
	const { clientX: x, clientY: y } = event
	const { width, height } = renderer.domElement
	pointer.set((x / width) * 2 - 1, -(y / height) * 2 + 1)
	// 基于鼠标点的裁剪坐标位和相机设置射线投射器
	raycaster.setFromCamera(pointer, camera)
	// 选择机柜
	const intersect = raycaster.intersectObjects(cabinets)[0]
	let intersectObj = intersect ? (intersect.object as Mesh) : null
	// 若之前已有机柜被选择，且不等于当前所选择的机柜，取消之前选择的机柜的高亮
	if (curCabinet && curCabinet !== intersectObj) {
		const material = curCabinet.material as MeshBasicMaterial
		material.setValues({
			map: maps.get('cabinet.jpg'),
		})
	}
	if (intersectObj) {
		this.onMouseMoveCabinet(x, y)
		if (intersectObj !== curCabinet) {
			this.curCabinet = intersectObj
			const material = intersectObj.material as MeshBasicMaterial
			material.setValues({
				map: maps.get('cabinet-hover.jpg'),
			})
			this.onMouseOverCabinet(intersectObj)
		}
	} else if (curCabinet) {
		this.curCabinet = null
		this.onMouseOutCabinet()
	} */
}

/* 灯光 */
{
	const light = new DirectionalLight(0xffffff, 1)
	light.position.set(10, 30, 20)
	light.castShadow = true
	light.shadow.mapSize.width = 1024
	light.shadow.mapSize.height = 1024
	light.shadow.camera.right = 15
	light.shadow.camera.left = -15
	light.shadow.camera.top = 15
	light.shadow.camera.bottom = -15
	light.shadow.camera.near = 1
	light.shadow.camera.far = 60
	scene.add(light)
}
{
	const light = new DirectionalLight(0xffffff, 0.2)
	light.position.set(-10, 10, -30)
	scene.add(light)
}

const StencilTest_SigleSection: React.FC = (): JSX.Element => {
	const divRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const { current } = divRef
		if (!current) {
			return
		}
		current.append(renderer.domElement)
		stage.responsive()
		stage.animate()

		return () => {
			renderer.domElement.remove()
		}
	}, [])
	return (
		<div
			ref={divRef}
			className="canvasWrapper"
			onMouseMove={(event) => {
				onMouseMove(event)
			}}
		></div>
	)
}

export default StencilTest_SigleSection
