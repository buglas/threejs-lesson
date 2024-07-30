import React, { useRef, useEffect } from 'react'

import {
	TextureLoader,
	SpriteMaterial,
	Sprite,
	Group,
	AdditiveBlending,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'
import { randFloatSpread } from 'three/src/math/MathUtils'

/* 快速初始化项目 */
const stage = new Stage(0, 0, 40)
const { scene, renderer, camera } = stage
// camera.far = 20

/* 粒子材质 */
const material = new SpriteMaterial({
	color: 0x00acec,
	blending: AdditiveBlending,
	// blending: CustomBlending,
	// blendSrc: SrcAlphaFactor,
	// blendSrcAlpha: SrcAlphaFactor,
	// blendDst: OneFactor,
	// blendDstAlpha: DstAlphaFactor,
})

/* 粒子集合 */
const group = new Group()
scene.add(group)
for (let i = 0; i < 400; i++) {
	/* 粒子对象 */
	const sprite = new Sprite(material)
	sprite.position.x = randFloatSpread(20)
	sprite.position.y = randFloatSpread(20)
	group.add(sprite)
}

/* 加载纹理 */
const textureLoader = new TextureLoader().loadAsync('/textures/snow/snow.png')
textureLoader.then((map) => {
	material.map = map
})

stage.beforeRender = (time = 0) => {
	// 旋转动画
	material.rotation = time * 0.003
	group.children.forEach((sprite, ind) => {
		// sizeAttenuation测试
		// material.sizeAttenuation = false
		sprite.position.z = Math.sin(time * 0.002 - ind * 0.1) * 40 - 20
	})
}

const SpriteMaterialTest: React.FC = (): JSX.Element => {
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

export default SpriteMaterialTest
