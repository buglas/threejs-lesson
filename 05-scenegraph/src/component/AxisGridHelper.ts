import { AxesHelper, GridHelper, LineBasicMaterial, Object3D } from "three"

export default class AxisGridHelper {
	grid: GridHelper
	axes: AxesHelper
	_visible: boolean = true
	constructor(obj: Object3D, size = 2) {
		const axes = new AxesHelper()
		const axesMat = axes.material as LineBasicMaterial
		axesMat.depthTest = false
		obj.add(axes)

		const grid = new GridHelper(size)
		const gridMat = grid.material as LineBasicMaterial
		gridMat.depthTest = false
		obj.add(grid)

		this.grid = grid
		this.axes = axes
		this.visible = this._visible
	}
	get visible() {
		return this._visible
	}
	set visible(v) {
		this._visible = v
		this.grid.visible = v
		this.axes.visible = v
	}
}
