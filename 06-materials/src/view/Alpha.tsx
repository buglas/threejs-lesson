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
	WebGLRenderer,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'
import { randFloatSpread } from 'three/src/math/MathUtils'

/* 快速初始化项目 */
const stage = new Stage(0, 0, 2)
const { scene, renderer } = stage
scene.background = new Color(0x00acec)

/* 粒子材质 */
const material = new SpriteMaterial({
	color: 0x00acec,
	// opacity: 0.5,
	// alphaTest: 0.6,
	alphaToCoverage: true,
})
const textureLoader = new TextureLoader()
const grassDiffLoader = textureLoader.loadAsync(
	'/textures/grass/grass-diff.jpg'
)
const grassMaskLoader = textureLoader.loadAsync(
	'/textures/grass/grass-mask.jpg'
)
Promise.all([grassDiffLoader, grassMaskLoader]).then((textures) => {
	material.map = textures[0]
	material.alphaMap = textures[1]
})

/* 粒子对象 */
const sprite = new Sprite(material)
scene.add(sprite)

const Alpha: React.FC = (): JSX.Element => {
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

export default Alpha
