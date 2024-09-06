import React, { useRef, useEffect } from 'react'
import './fullScreen.css'
import { Box } from '../component/Box'
import { Link } from 'react-router-dom'


const Memory02: React.FC = (): JSX.Element => {
	const divRef = useRef<HTMLDivElement>(null)
  const box=new Box('Memory02')
  box.init()
  box.addEventListener('beforerender',({time})=>{
    box.rotate(time*0.001)
    // console.log('beforerender',box.renderer.info.render);
  })
  box.animate()
	useEffect(() => {
		const { current } = divRef
		if (!current) {
			return
		}
    const {renderer:{domElement}}=box
    current.append(domElement)
    box.resize(current.clientWidth,current.clientHeight)
		return () => {
      box.dispose()
			domElement.remove()
      // box.render()
      // console.log('dispose',box.renderer.info.render);
		}
	}, [])
	return <div ref={divRef} className="canvasWrapper">
  <div style={{position:'absolute',margin:'15px'}}>
    <Link to="/">home</Link>
  </div>
</div>
}

export default Memory02
