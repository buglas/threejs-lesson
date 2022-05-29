import React from "react"
import { Link } from "react-router-dom"

const SceneGraph: React.FC = (): JSX.Element => {
	return (
		<nav style={{ width: "60%", margin: "auto" }}>
			<h2>SceneGraph 图形树</h2>
			<ul>
				<li>
					<Link to="/Universe">Universe 宇宙</Link>
				</li>
				<li>
					<Link to="/Tank">Tank 坦克</Link>
				</li>
			</ul>
		</nav>
	)
}

export default SceneGraph
