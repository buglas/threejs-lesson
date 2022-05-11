import React, { useRef, useEffect } from "react";
import {
  BoxGeometry,
  CircleGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  DodecahedronGeometry,
  EdgesGeometry,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PolyhedronGeometry,
  Scene,
  SphereGeometry,
  TetrahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  WebGLRenderer,
  WireframeGeometry,
} from "three";
import Stage from "../component/Stage";

const stage = new Stage(3, 2, 0);
const { scene, renderer } = stage;

/* const geometry = new SphereGeometry();
const wireframe = new WireframeGeometry(geometry);
const line = new LineSegments(wireframe);
scene.add(line);
const mat = line.material as LineBasicMaterial;
mat.color = new Color(0xffff00);
mat.transparent = true;
mat.opacity = 0.5;
 */

const geometry = new SphereGeometry();
const edges = new EdgesGeometry(geometry);
const line = new LineSegments(edges);
scene.add(line);

const LineGeo: React.FC = (): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current } = divRef;
    if (current) {
      current.innerHTML = "";
      current.append(renderer.domElement);
      stage.animate();
    }
  }, []);
  return <div ref={divRef} className="canvasWrapper"></div>;
};

export default LineGeo;
