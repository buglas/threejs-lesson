import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = (): JSX.Element => {
	return (
		<nav style={{ width: '60%', margin: 'auto' }}>
			<h2>Materials</h2>
			<ul>
				<li>
					<Link to="/Memory01">内存清理示例1</Link>
				</li>
				<li>
					<Link to="/Memory02">内存清理示例2</Link>
				</li>
				<li>
					<Link to="/Memory03">内存清理示例3</Link>
				</li>
				<li>
					<Link to="/UseEffectTest">useEffect测试</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Home
