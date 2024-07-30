import React, { useRef, useEffect } from 'react'
import {
  AxesHelper,
	BufferGeometry,
	Color,
	Float32BufferAttribute,
	Line,
	LineBasicMaterial,
	Matrix3,
	Vector3,
} from 'three'
import Stage from '../component/Stage'
import './fullScreen.css'

/* 快速初始化项目 */
const stage = new Stage(1, 2, 4)
const { scene, renderer } = stage

/* 已知条件 */
const u=new Vector3(1,1,1).normalize()
const A=new Vector3(0.75,0.4,0.4)

const alpha=Math.atan2(u.z,u.y)
const ca=Math.cos(alpha)
const sa=Math.sin(alpha)
const Mx=new Matrix3().set(
  1,0,0,
  0,ca,-sa,
  0,sa,ca
)
const u1=u.clone().applyMatrix3(Mx)
const beta=-Math.atan2(u1.x,u1.z)
const cb=Math.cos(beta)
const sb=Math.sin(beta)
const My=new Matrix3().set(
  cb,0,sb,
  0,1,0,
  -sb,0,cb
)
const N=new Matrix3().multiplyMatrices(My,Mx)
const Ni=N.clone().transpose()

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
  
  // 旋转矩阵
  const M=new Matrix3().set(
    c,-s,0,
    s,c,0,
    0,0,1
  )
  const rotateMatrix=Ni.clone().multiply(M).multiply(N)

  // 旋转后的位置
  const B=A.clone().applyMatrix3(rotateMatrix)

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
