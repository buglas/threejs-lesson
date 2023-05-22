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
				<li>
					<Link to="/MeshLambertMaterialTest">MeshLambertMaterialTest</Link>
				</li>
				<li>
					<Link to="/MeshPhongMaterialTest">MeshPhongMaterialTest</Link>
				</li>
				<li>
					<Link to="/MeshStandardMaterialTest">MeshStandardMaterialTest</Link>
				</li>
				<li>
					<Link to="/MeshPhysicalMaterialTest">MeshPhysicalMaterialTest</Link>
				</li>
				<li>
					<Link to="/MeshToonMaterialTest">MeshToonMaterialTest</Link>
				</li>
				<li>
					<Link to="/ShadowMaterialTest">ShadowMaterialTest</Link>
				</li>
				<li>
					<Link to="/MeshDepthMaterialTest">MeshDepthMaterialTest</Link>
				</li>
				<li>
					<Link to="/PointsMaterialTest">PointsMaterialTest</Link>
				</li>
				<li>
					<Link to="/LineBasicMaterialTest">LineBasicMaterialTest</Link>
				</li>
				<li>
					<Link to="/LineDashedMaterialTest">LineDashedMaterialTest</Link>
				</li>
				<li>
					<Link to="/SpriteMaterialTest">SpriteMaterialTest</Link>
				</li>
				<li>
					<Link to="/Alpha">Alpha</Link>
				</li>
				<li>
					<Link to="/Clip">Clip</Link>
				</li>
				<li>
					<Link to="/BlendTest">BlendTest</Link>
				</li>
				<li>
					<Link to="/StencilTest_SigleSection">StencilTest_SigleSection</Link>
				</li>
				<li>
					<Link to="/StencilTest_MultiSection">StencilTest_MultiSection</Link>
				</li>
				<li>
					<Link to="/ColorWrite">ColorWrite</Link>
				</li>
				<li>
					<Link to="/VertextColors">VertextColors</Link>
				</li>
				<li>
					<Link to="/OnBeforeCompile">OnBeforeCompile</Link>
				</li>
				<li>
					<Link to="/ShaderMaterialTest">ShaderMaterialTest</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Materials
