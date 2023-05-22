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
	LinearEncoding,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'
import { randFloatSpread } from 'three/src/math/MathUtils'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { log } from 'console'

/* 快速初始化项目 */
const stage = new Stage(20, 30, 40)
const { scene, renderer } = stage
renderer.localClippingEnabled = true
renderer.shadowMap.enabled = true
// 背景色
renderer.setClearColor(0x666666)

// 高亮材质
const highlightMat = new MeshBasicMaterial({
	color: 0xff0000,
	opacity: 0,
	blending: AdditiveBlending,
	transparent: true,
	polygonOffset: true,
	polygonOffsetFactor: 0,
	polygonOffsetUnits: -1,
})

const gltfLoader = new GLTFLoader()
gltfLoader.loadAsync('/models/gltf/cabinet.glb').then((model) => {
	init(model.scene.children[0] as Mesh)
})

const row = 2
const col = 4
const rowSize = 2.85
const colSize = 9
function init(mesh: Mesh) {
	const material = mesh.material as MeshStandardMaterial
	const { map } = material
	if (!map) {
		return
	}
	map.encoding = LinearEncoding

	const { geometry } = mesh

	for (let z = -row; z < row; z++) {
		for (let x = -col; x < col; x++) {
			const mesh = new Mesh(
				geometry,
				new MeshBasicMaterial({
					map,
				})
			)
			mesh.position.x = x * rowSize
			mesh.position.z = z * colSize
			scene.add(mesh)
		}
	}

	/* 高亮材质 */
	const highlightMesh = new Mesh(mesh.geometry, highlightMat)
	scene.add(highlightMesh)
}

/* 预警动画 */
stage.beforeRender = function (time = 0) {
	highlightMat.opacity = (Math.sin(time * 0.005) * 0.5 + 0.5) * 0.4 + 0.1
}

const BlendTest: React.FC = (): JSX.Element => {
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
	return <div ref={divRef} className="canvasWrapper"></div>
}

export default BlendTest
