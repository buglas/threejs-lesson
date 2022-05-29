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
import Stage from "../component/Stage"

const stage = new Stage()
const { scene, renderer } = stage
// 顶点数据
const vertices = [
	// front
	{ pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 0] },
	{ pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0] },
	{ pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1] },

	{ pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1] },
	{ pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0] },
	{ pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 1] },

	// right
	{ pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 0] },
	{ pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0] },
	{ pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1] },

	{ pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1] },
	{ pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0] },
	{ pos: [1, 1, -1], norm: [1, 0, 0], uv: [1, 1] },
	// back
	{ pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 0] },
	{ pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0] },
	{ pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1] },

	{ pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1] },
	{ pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0] },
	{ pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 1] },
	// left
	{ pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 0] },
	{ pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0] },
	{ pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1] },

	{ pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1] },
	{ pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0] },
	{ pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 1] },
	// top
	{ pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 0] },
	{ pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0] },
	{ pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1] },

	{ pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1] },
	{ pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0] },
	{ pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 1] },
	// bottom
	{ pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 0] },
	{ pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0] },
	{ pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1] },

	{ pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1] },
	{ pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0] },
	{ pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 1] },
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
geometry.setAttribute("normal", normalAttr)
geometry.setAttribute("uv", uvAttr)

{
	const material = new MeshNormalMaterial({
		polygonOffset: true,
		polygonOffsetFactor: 1,
		polygonOffsetUnits: 1,
	})
	const cube = new Mesh(geometry, material)
	scene.add(cube)
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
