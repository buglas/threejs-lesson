import React, { useRef, useEffect } from "react"
import {
	BoxGeometry,
	BufferAttribute,
	BufferGeometry,
	CircleGeometry,
	Color,
	ConeGeometry,
	CylinderGeometry,
	DirectionalLight,
	DodecahedronGeometry,
	EdgesGeometry,
	IcosahedronGeometry,
	LineBasicMaterial,
	LineSegments,
	Mesh,
	MeshBasicMaterial,
	MeshNormalMaterial,
	MeshPhongMaterial,
	OctahedronGeometry,
	PerspectiveCamera,
	PolyhedronGeometry,
	Scene,
	SphereGeometry,
	TetrahedronGeometry,
	TextureLoader,
	TorusGeometry,
	TorusKnotGeometry,
	WebGLRenderer,
	WireframeGeometry,
} from "three"
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper"
import Stage from "../component/Stage"

const stage = new Stage()
const { scene, renderer } = stage
// 顶点数据
const vertices = [
	// front
	{ pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 0] }, // 0
	{ pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0] }, // 1
	{ pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1] }, // 2
	{ pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 1] }, // 3
	// right
	{ pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 0] }, // 4
	{ pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0] }, // 5
	{ pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1] }, // 6
	{ pos: [1, 1, -1], norm: [1, 0, 0], uv: [1, 1] }, // 7
	// back
	{ pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 0] }, // 8
	{ pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0] }, // 9
	{ pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1] }, // 10
	{ pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 1] }, // 11
	// left
	{ pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 0] }, // 12
	{ pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0] }, // 13
	{ pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1] }, // 14
	{ pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 1] }, // 15
	// top
	{ pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 0] }, // 16
	{ pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0] }, // 17
	{ pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1] }, // 18
	{ pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 1] }, // 19
	// bottom
	{ pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 0] }, // 20
	{ pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0] }, // 21
	{ pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1] }, // 22
	{ pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 1] }, // 23
]

//按照属性将这些顶点分成三组
const positions = []
const normals = []
const uvs = []
for (const vertex of vertices) {
	positions.push(...vertex.pos)
	normals.push(...vertex.norm)
	uvs.push(...vertex.uv)
}

// 基于positions、normals 和uvs 建立BufferAttribute 对象
const geometry = new BufferGeometry()
const positionNumComponents = 3
const normalNumComponents = 3
const uvNumComponents = 2
const positionAttr = new BufferAttribute(
	new Float32Array(positions),
	positionNumComponents
)
const normalAttr = new BufferAttribute(
	new Float32Array(normals),
	normalNumComponents
)
const uvAttr = new BufferAttribute(new Float32Array(uvs), uvNumComponents)
// 将BufferAttribute 对象添加到geometry 几何体中
geometry.setAttribute("position", positionAttr)
// geometry.setAttribute("normal", normalAttr)
geometry.setAttribute("uv", uvAttr)

// 设置顶点索引
geometry.setIndex([
	// front
	0, 1, 2, 2, 1, 3,
	// right
	4, 5, 6, 6, 5, 7,
	// back
	8, 9, 10, 10, 9, 11,
	// left
	12, 13, 14, 14, 13, 15,
	// top
	16, 17, 18, 18, 17, 19,
	// bottom
	20, 21, 22, 22, 21, 23,
])

// 计算法线
geometry.computeVertexNormals()

// 顶点更新
setTimeout(() => {
	positionAttr.setXYZ(18, 1, 2, 1)
	geometry.computeVertexNormals()
	helper.update()
	positionAttr.needsUpdate = true
}, 1000)

let helper: VertexNormalsHelper
{
	const material = new MeshNormalMaterial({
		polygonOffset: true,
		polygonOffsetFactor: 1,
		polygonOffsetUnits: 1,
	})
	const cube = new Mesh(geometry, material)
	helper = new VertexNormalsHelper(cube)
	scene.add(cube, helper)
}
{
	const material = new MeshBasicMaterial({
		wireframe: true,
	})
	const cube = new Mesh(geometry, material)
	scene.add(cube)
}
const CustomGeo: React.FC = (): JSX.Element => {
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

export default CustomGeo
