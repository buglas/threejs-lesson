import React from 'react'
import { Link } from 'react-router-dom'

const Materials: React.FC = (): JSX.Element => {
	return (
		<nav style={{ width: '60%', margin: 'auto' }}>
			<h2>Materials</h2>
			<ul>
				<li>
					<Link to="/DirectionalLightShadowTest">
						DirectionalLightShadowTest
					</Link>
				</li>
				<li>
					<Link to="/PointLightShadowTest">PointLightShadowTest</Link>
				</li>
				<li>
					<Link to="/SpotLightShadowTest">SpotLightShadowTest</Link>
				</li>
				<li>
					<Link to="/LightProbe">LightProbe</Link>
				</li>
				<li>
					<Link to="/LightProbeCubeCameraTest">LightProbeCubeCameraTest</Link>
				</li>
				<li>
					<Link to="/LensflareTest">LensflareTest</Link>
				</li>
				<li>
					<Link to="/SpotLightTest">SpotLightTest</Link>
				</li>
				<li>
					<Link to="/RectarealightTest">RectarealightTest</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Materials
