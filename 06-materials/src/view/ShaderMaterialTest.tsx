import React, { useRef, useEffect } from 'react'
import {
	AdditiveBlending,
	Points,
	ShaderMaterial,
	SphereGeometry,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(0, -3, 4)
const { renderer, scene } = stage

const geo = new SphereGeometry()
const mat = new ShaderMaterial({
	uniforms: { time: { value: 0 } },
	vertexShader: `
    uniform float time;
    varying vec3 v_position;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize=(sin(time*0.005+gl_Position.y*1.5)*0.5+0.5)* (gl_Position.z)*5.0+5.;
      v_position=position;
    }
  `,
	fragmentShader: `
    uniform float time;
    varying vec3 v_position;
    void main(){
      float dist=distance(gl_PointCoord,vec2(0.5,0.5));
      if(dist<0.5){
        gl_FragColor=vec4(cos(time*0.005+v_position.x)*0.5+0.5,sin(time*0.005+v_position.y*3.)*0.5+0.5,0,(0.5-dist));
      }else{
        discard;
      }
    }
  `,
	transparent: true,
	blending: AdditiveBlending,
})
const mesh = new Points(geo, mat)
scene.add(mesh)

stage.beforeRender = function (time = 0) {
	mat.uniforms.time.value = time
}

const VertextColors: React.FC = (): JSX.Element => {
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

export default VertextColors
