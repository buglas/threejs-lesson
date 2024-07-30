import React, { useRef, useEffect } from 'react'
import {
  AxesHelper,
	BufferGeometry,
	Color,
	Float32BufferAttribute,
	Line,
	LineBasicMaterial,
	Vector3,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(1, 2, 4)
const { scene, renderer } = stage

/* 已知条件 */
const u=new Vector3(1,1,1).normalize()
const A=new Vector3(0.75,0.1,0.1)
const OP=u.clone().multiplyScalar(A.dot(u))
const PA=A.clone().sub(OP)
const uxA=u.clone().cross(A)

/* u轴 */
const lineGeo = new BufferGeometry()
lineGeo.setAttribute('position', new Float32BufferAttribute([0,0,0,u.x,u.y,u.z], 3))
lineGeo.setAttribute('color', new Float32BufferAttribute([0,1,0,1,1,0], 3))
const lineMat = new LineBasicMaterial({ vertexColors:true})
const line = new Line(lineGeo, lineMat)
scene.add(line)

/* 坐标系 */
const axes=new AxesHelper(1)
const axesColor= new Color(0x666666)
axes.setColors(axesColor,axesColor,axesColor)
scene.add(axes)

/* 绕u旋转的轨迹 */
const points=[A.x,A.y,A.z]
const trackPointNum=20
const trackGeo = new BufferGeometry()
const trackColors=[]
for(let i=0;i<trackPointNum;i++){
  const n=i/trackPointNum
  trackColors.push(1,n,0)
}
trackGeo.setAttribute('color', new Float32BufferAttribute(trackColors, 3))
const trackMat = new LineBasicMaterial({ vertexColors:true})
const track = new Line(trackGeo, trackMat)
scene.add(track)

/* 时间 */
const time=new Date().getTime()
/* 连续旋转 */
stage.beforeRender=function(){
  // 旋转弧度
  const theta=(new Date().getTime()-time)*0.006
  const c=Math.cos(theta)
  const s=Math.sin(theta)
  // 旋转后的位置
  const B=OP.clone()
  .add(PA.clone().multiplyScalar(c))
  .add(uxA.clone().multiplyScalar(s))
  // 过滤极小距离点
  if(new Vector3(points[0],points[1],points[2]).sub(B).lengthSq()<0.001){
    return
  }
  // 在数组前面添加点
  points.unshift(B.x,B.y,B.z)
  // 删除最后一个点
  const pointsLen=points.length
  if(pointsLen/3>trackPointNum){
    points.splice(pointsLen-4,pointsLen-1)
  }
  // 更新position
  trackGeo.setAttribute('position', new Float32BufferAttribute(points, 3))
}

const Rotate01: React.FC = (): JSX.Element => {
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

export default Rotate01
