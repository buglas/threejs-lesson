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
  PlaneGeometry,
  PolyhedronGeometry,
  RingGeometry,
  Scene,
  Shape,
  ShapeGeometry,
  WebGLRenderer,
} from "three";
import Stage from "../component/Stage";
import "./fullScreen.css";

const stage = new Stage(0, 0, 4);
const { scene, renderer } = stage;

// const geometry = new PlaneGeometry(0.5, 2, 2, 4);
// const geometry = new CircleGeometry(0.5, 16, Math.PI / 2, Math.PI / 3);
// const geometry = new RingGeometry(0.3, 0.6, 12, 2, Math.PI / 6, (Math.PI * 2) / 3);

const shape = new Shape();
shape.moveTo(0, 0);
shape.bezierCurveTo(
  //控制点1
  1,
  1,
  // 控制点2
  -1,
  1,
  // 结束点
  0,
  0
);
const geometry = new ShapeGeometry(shape, 6);

{
  const material = new MeshNormalMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);
}
{
  const material = new MeshBasicMaterial({
    wireframe: true,
  });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);
}

const Geo2D: React.FC = (): JSX.Element => {
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

export default Geo2D;
