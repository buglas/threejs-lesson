import React from 'react'
import { Link } from 'react-router-dom'

const Materials: React.FC = (): JSX.Element => {
	return (
		<nav style={{ width: '60%', margin: 'auto' }}>
			<h2>Materials</h2>
			<ul>
				<li>
					<Link to="/MeshBasicMaterialTest">MeshBasicMaterial</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Materials
