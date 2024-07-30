import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = (): JSX.Element => {
	return (
		<nav style={{ width: '60%', margin: 'auto' }}>
			<h2>Materials</h2>
			<ul>
				<li>
					<Link to="/Rotate01">几何解</Link>
				</li>
				<li>
					<Link to="/Rotate02">矩阵解</Link>
				</li>
				<li>
					<Link to="/Rotate03">基变换解</Link>
				</li>
				<li>
					<Link to="/Rotate04">四元数解</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Home
