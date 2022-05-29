import { PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default class Stage {
	// 渲染器
	renderer: WebGLRenderer
	// 场景
	scene: Scene
	// 相机
	camera: PerspectiveCamera = new PerspectiveCamera()

	// 渲染之前
	beforeRender = (time: number = 0) => {}

	// 初始化场景
	constructor() {
		this.scene = new Scene()
		this.renderer = new WebGLRenderer({ antialias: true })
		const { clientWidth, clientHeight } = this.renderer.domElement
		this.renderer.setSize(
			clientWidth * devicePixelRatio,
			clientHeight * devicePixelRatio,
			false
		)
	}

	// 响应式布局
	responsive() {
		const { renderer, camera } = this
		if (this.resizeRendererToDisplaySize(renderer)) {
			const { clientWidth, clientHeight } = renderer.domElement
			camera.aspect = clientWidth / clientHeight
			camera.updateProjectionMatrix()
		}
	}

	// 重置渲染尺寸
	resizeRendererToDisplaySize(renderer: WebGLRenderer): boolean {
		const { width, height, clientWidth, clientHeight } = renderer.domElement
		const [w, h] = [
			clientWidth * devicePixelRatio,
			clientHeight * devicePixelRatio,
		]
		const needResize = width !== w || height !== h
		if (needResize) {
			renderer.setSize(w, h, false)
		}
		return needResize
	}

	// 连续渲染
	animate(time = 0) {
		this.responsive()
		this.beforeRender(time)
		this.renderer.render(this.scene, this.camera)
		requestAnimationFrame((time) => {
			this.animate(time)
		})
	}
}
