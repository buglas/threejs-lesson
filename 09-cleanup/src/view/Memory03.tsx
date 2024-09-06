import React, { useRef, useEffect } from 'react'
import './fullScreen.css'
import { Box } from '../component/Box'
import { Link } from 'react-router-dom'

const box=new Box('Memory03')

const Memory03: React.FC = (): JSX.Element => {
	const divRef = useRef<HTMLDivElement>(null)
  box.init()
  box.addEventListener('beforerender',({time})=>{
    box.rotate(time*0.001)
  })
  
	useEffect(() => {
		const { current } = divRef
		if (!current) {
			return
		}
    const {renderer:{domElement}}=box
    current.append(domElement)
    box.resize(current.clientWidth,current.clientHeight)
    box.animate()
		return () => {
      box.dispose()
			domElement.remove()
      box.render()
		}
	}, [])
	return <div ref={divRef} className="canvasWrapper">
    <div style={{position:'absolute',margin:'15px'}}>
      <Link to="/">home</Link>
    </div>
  </div>
}

export default Memory03
