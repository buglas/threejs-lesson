import React, { useRef, useEffect } from "react";
import {
  BoxGeometry,
  BufferGeometry,
  CircleGeometry,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  DodecahedronGeometry,
  EdgesGeometry,
  IcosahedronGeometry,
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
} from "three";
import Stage from "../component/Stage";

const stage = new Stage();
const { scene, renderer } = stage;

// const geometry = new BoxGeometry(0.5, 0.7, 1.5, 2, 3, 4);
// const geometry = new TetrahedronGeometry(0.5, 0);
// const geometry = new OctahedronGeometry(0.5, 0);
// const geometry = new DodecahedronGeometry(0.5, 0);
// const geometry = new IcosahedronGeometry(0.5, 1);
/* const geometry = new PolyhedronGeometry(
  [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1],
  [2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4],
  0.8,
  2
); */
/* const geometry = new SphereGeometry(
  0.5,
  8,
  6,
  // 水平切片
  0,
  Math.PI / 2,
  // 垂直切片
  0,
  Math.PI / 3
); */
// const geometry = new ConeGeometry(0.5, 2, 16, 2, true, 0, Math.PI / 2);
// const geometry = new CylinderGeometry(0.5, 1.5, 2, 16, 2, false, 0, Math.PI / 2);
// const geometry = new TorusGeometry(1.5, 0.2, 16, 16, Math.PI / 2);
const geometry = new TorusKnotGeometry(0.5, 0.1, 128, 3, 8, 9);

{
  const material = new MeshNormalMaterial({
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

const Geo3D: React.FC = (): JSX.Element => {
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

export default Geo3D;
