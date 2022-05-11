import React, { useRef, useEffect } from "react";
import {
  BoxGeometry,
  BufferGeometry,
  CircleGeometry,
  ConeGeometry,
  Curve,
  CylinderGeometry,
  DirectionalLight,
  DodecahedronGeometry,
  DoubleSide,
  EdgesGeometry,
  EllipseCurve,
  ExtrudeGeometry,
  IcosahedronGeometry,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PolyhedronGeometry,
  Scene,
  Shape,
  SphereGeometry,
  TetrahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import Stage from "../component/Stage";
import { CustomSinCurve } from "../component/CustomSinCurve";

const stage = new Stage();
const { scene, renderer } = stage;

/* const path = new CustomSinCurve();
const geometry = new TubeGeometry(path, 128, 0.05, 3, false);
 */

/* const points = [];
for (let i = 0; i < 1; i += 0.1) {
  const x = (Math.sin(i * Math.PI * 1.8 + 2.8) + 1.1) / 5;
  points.push(new Vector2(x, i));
}
const geometry = new LatheGeometry(points, 32, 0, Math.PI); */

/* const shape = new Shape();
shape.moveTo(0, 0);
shape.lineTo(1, 0);
shape.lineTo(1, 1);
const geometry = new ExtrudeGeometry(shape, {
  depth: 0.3,
  steps: 2,
  bevelEnabled: true,
  bevelSize: 0.05,
  bevelThickness: 0.05,
  bevelSegments: 1,
}); */
const shape = new Shape();
shape.moveTo(0, 0);
shape.lineTo(0.1, 0);
shape.lineTo(0.1, 0.1);
const path = new CustomSinCurve();
const geometry = new ExtrudeGeometry(shape, {
  steps: 128,
  extrudePath: path,
});

{
  const material = new MeshNormalMaterial({
    side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  const cube = new Mesh(geometry, material);
  scene.add(cube);
}
{
  const material = new MeshBasicMaterial({
    wireframe: true,
  });
  const cube = new Mesh(geometry, material);
  scene.add(cube);
}

const PathCompose: React.FC = (): JSX.Element => {
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

export default PathCompose;
