import {
	BufferGeometry,
	Vector3,
	Object3D,
	BufferAttribute,
	InterleavedBufferAttribute,
	Euler,
} from "three"
const pi2 = Math.PI * 2

export default class WaveBall extends BufferGeometry {
	// 分段数
	widthSegments: number
	heightSegments: number
	// 正弦参数y=Asin(ωx+φ)
	a: number = 0.7
	omega: number = 12

	constructor(widthSegments: number = 18, heightSegments: number = 12) {
		super()
		this.widthSegments = widthSegments
		this.heightSegments = heightSegments
		this.init()
	}
	init() {
		const { widthSegments, heightSegments } = this
		//网格线的数量
		const [width, height] = [widthSegments + 1, heightSegments + 1]
		//顶点数量
		const count = width * height
		//顶点点位
		const positions = new Float32Array(count * 3)
		//顶点索引
		const indices = []

		//根据经纬度计算顶点点位的方法
		const setPos = SetPos(positions)

		// 逐行列遍历
		for (let y = 0; y < height; ++y) {
			// 维度[-Math.PI/2,Math.PI/2]
			const lat = (y / heightSegments - 0.5) * Math.PI
			for (let x = 0; x < width; ++x) {
				// 经度[-Math.PI,Math.PI]
				const long = (x / widthSegments - 0.5) * Math.PI * 2
				// 设置顶点点位
				setPos(lat, long)
				// 设置顶点索引
				if (y && x) {
					// 一个矩形格子的左上lt、右上rt、左下lb、右下rb点
					const lt = (y - 1) * width + (x - 1)
					const rt = (y - 1) * width + x
					const lb = y * width + (x - 1)
					const rb = y * width + x
					indices.push(lb, rb, lt, lt, rb, rt)
				}
			}
		}
		this.setAttribute("position", new BufferAttribute(positions, 3))
		this.setIndex(indices)
		this.computeVertexNormals()
	}
	//波浪
	wave(phi = 0) {
		const { widthSegments, heightSegments, a, omega } = this
		//网格线的数量
		const [width, height] = [widthSegments + 1, heightSegments + 1]
		// 顶点点位
		const posAttr = this.getAttribute("position")
		// 修改点位的方法
		const changePos = ChangePos(posAttr)
		// 一圈波浪线的总弧度
		const allAng = omega * pi2
		// 每个分段的弧度
		const yAng = allAng / heightSegments
		const xAng = allAng / widthSegments
		// 逐行列遍历
		for (let y = 0; y < height; ++y) {
			// y向起伏
			const r0 = Math.sin(y * yAng + phi)
			// 基于y值做起伏衰减
			const decay = a * 0.2 + a * (0.5 - Math.abs(y / heightSegments - 0.5))
			for (let x = 0; x < width; ++x) {
				// x向起伏
				const r1 = Math.sin(x * xAng + phi)
				// 基于半径修改顶点位置
				changePos((r0 + r1) * decay + 1)
				// changePos(r0 * r1 * decay + 1)
				// changePos(r1 * 0.1 + 1)
			}
		}
		// this.computeVertexNormals()
		// 顶点数据需要更新
		posAttr.needsUpdate = true
	}
}

// 基于半径修改顶点位置
function ChangePos(attr: BufferAttribute | InterleavedBufferAttribute) {
	let index = 0
	// 根据索引获取顶点
	const getXYZ = GetXYZ(attr)
	return function (r: number) {
		const p = getXYZ(index)
		p.setLength(r)
		// 设置指定索引位的顶点的x、y、z值
		attr.setXYZ(index, ...p.toArray())
		index += 1
	}
}

// 根据索引获取顶点
function GetXYZ(attr: BufferAttribute | InterleavedBufferAttribute) {
	return function (ind: number) {
		return new Vector3(attr.getX(ind), attr.getY(ind), attr.getZ(ind))
	}
}

// 基于经纬度计算顶点点位
function SetPos(positions: Float32Array) {
	let posNdx = 0
	//根据经纬度获取点位
	// const getPoint = GetPoint()
	return function (lat: number, long: number) {
		const pos = getPoint(lat, long)
		positions.set(pos, posNdx)
		posNdx += 3
		return pos
	}
}
// 获取顶点位
function GetPoint() {
	//经度辅助对象
	const longHelper = new Object3D()
	//维度辅助对象
	const latHelper = new Object3D()
	// 顶点辅助对象
	const pointHelper = new Object3D()
	//构建层级关系
	longHelper.add(latHelper)
	latHelper.add(pointHelper)
	pointHelper.position.z = 1
	//暂存顶点
	const temp = new Vector3()
	return function (lat: number, long: number) {
		// 旋转经、纬度辅助对象
		longHelper.rotation.y = long
		latHelper.rotation.x = lat
		// 返回longHelper的世界坐标位
		return pointHelper.getWorldPosition(temp).toArray()
	}
}
// 欧拉
function getPoint(lat: number, long: number) {
	const euler = new Euler(lat, long, 0, "YXZ")
	const p = new Vector3(0, 0, 1)
	p.applyEuler(euler)
	return p.toArray()
}
