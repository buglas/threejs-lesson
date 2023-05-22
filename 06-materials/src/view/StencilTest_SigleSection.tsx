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
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'
import { randFloatSpread } from 'three/src/math/MathUtils'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/* 快速初始化项目 */
const stage = new Stage(20, 20, 20)
const { scene, renderer, controls, camera } = stage
renderer.localClippingEnabled = true
renderer.shadowMap.enabled = true
camera.near = 1
camera.far = 50
controls.target.set(0, 5, 0)
controls.update()
// 背景色
renderer.setClearColor(0xdddddd)

/* 环境光 */
new RGBELoader().loadAsync('/textures/environment/shop.hdr').then((texture) => {
	texture.mapping = EquirectangularReflectionMapping
	scene.environment = texture
})

/*  加载模型 */
const gltfLoader = new GLTFLoader()
const buildPro = gltfLoader.loadAsync('/models/gltf/build.glb')

/* 平面 */
const hp = new Plane(new Vector3(0, -1, 0), 4.9)

/* 平面几何体 */
const planeGeom = new PlaneGeometry(20, 20)

/* 建筑材质 */
const buildMat = new MeshStandardMaterial({
	color: 0xeeeeee,
	roughness: 0.2,
	clippingPlanes: [hp],
	clipShadows: true,
})

/* 模板的基础材质*/
const baseMat = new MeshBasicMaterial()
baseMat.depthWrite = false
baseMat.depthTest = false
baseMat.colorWrite = false
baseMat.stencilWrite = true
baseMat.stencilFunc = AlwaysStencilFunc

/* 背面材质 */
const backMat = baseMat.clone()
backMat.side = BackSide
backMat.clippingPlanes = [hp]
backMat.stencilFail = IncrementWrapStencilOp
backMat.stencilZPass = IncrementWrapStencilOp

/* 正面材质 */
const frontMat = baseMat.clone()
frontMat.side = FrontSide
frontMat.clippingPlanes = [hp]
frontMat.stencilFail = DecrementWrapStencilOp
frontMat.stencilZPass = DecrementWrapStencilOp

/* 截面材质 */
const sectionMat = new MeshStandardMaterial({
	color: 0xe91e63,
	metalness: 0.1,
	roughness: 0.75,
	stencilWrite: true,
	stencilRef: 1,
	stencilFunc: EqualStencilFunc,
})

/* 水平面 */
const hpMesh = new Mesh(planeGeom, sectionMat)
transformObjByPlane(hpMesh, hp)
hpMesh.onAfterRender = function (renderer) {
	renderer.clearStencil()
}

function transformObjByPlane(obj: Object3D, plane: Plane) {
	const { position } = obj
	const { normal } = plane
	plane.coplanarPoint(obj.position)
	obj.lookAt(
		position.x - normal.x,
		position.y - normal.y,
		position.z - normal.z
	)
}

buildPro.then((model) => {
	init(model.scene.children[0] as Mesh)
})

function init(mesh: Mesh) {
	/* 建筑 */
	mesh.material = buildMat
	mesh.castShadow = true
	mesh.receiveShadow = true
	scene.add(mesh)

	/* 建筑几何体 */
	const geometry = mesh.geometry

	/* 背面 */
	const backMesh = new Mesh(geometry, backMat)
	scene.add(backMesh)

	/* 正面 */
	const frontMesh = new Mesh(geometry, frontMat)
	scene.add(frontMesh)

	/* 水平面 */
	scene.add(hpMesh)
}

/* 地面 */
{
	const geometry = new PlaneGeometry(2000, 2000)
	geometry.rotateX(-Math.PI / 2)
	const material = new MeshStandardMaterial({
		color: 0x666666,
		roughness: 1,
	})
	const plane = new Mesh(geometry, material)
	plane.receiveShadow = true
	// plane.position.y = -1
	scene.add(plane)
}

/* 灯光 */
const light = new DirectionalLight(0xffffff, 0.3)
light.position.set(10, 30, 30)
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

const StencilTest_SigleSection: React.FC = (): JSX.Element => {
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

export default StencilTest_SigleSection
