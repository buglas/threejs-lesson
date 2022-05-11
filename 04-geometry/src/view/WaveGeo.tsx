import React, { useRef, useEffect } from "react";
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
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
  TextureLoader,
  TorusGeometry,
  TorusKnotGeometry,
  WebGLRenderer,
  WireframeGeometry,
} from "three";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";
import Stage from "../component/Stage";

const stage = new Stage(5, 3, 0);
const { scene, renderer } = stage;
const geometry = new BufferGeometry();

{
  const material = new MeshNormalMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);
}
const UpdateGeo: React.FC = (): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current } = divRef;
    if (current) {
      current.innerHTML = "";
      current.append(renderer.domElement);
      stage.animate();
    }
  }, []);
  return <div ref={divRef}></div>;
};

export default UpdateGeo;
