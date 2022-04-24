import React, { useRef, useEffect } from "react";
import { BoxGeometry, DirectionalLight, Mesh, MeshNormalMaterial, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import "./fullScreen.css";

const { innerWidth, innerHeight } = window;
const scene = new Scene();
const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new WebGLRenderer();
// renderer.setSize(innerWidth, innerHeight);

const geometry = new BoxGeometry();
const material = new MeshPhongMaterial({ color: 0x44aa88 });
// const cube = new Mesh(geometry, material);
// scene.add(cube);
const cubes = [-2, 0, 2].map((num) => makeInstance(num));
scene.add(...cubes);
function makeInstance(x: number) {
  const cube = new Mesh(geometry, material);
  cube.position.x = x;
  return cube;
}

const color = 0xffffff;
const intensity = 1;
const light = new DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  if (resizeRendererToDisplaySize(renderer)) {
    const { clientWidth, clientHeight } = renderer.domElement;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }
  cubes.forEach((cube) => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

// 将渲染尺寸设置为其显示的尺寸，返回画布像素尺寸是否等于其显示(css)尺寸的布尔值
function resizeRendererToDisplaySize(renderer: WebGLRenderer): boolean {
  const { width, height, clientWidth, clientHeight } = renderer.domElement;
  const needResize = width !== clientWidth || height !== clientHeight;
  if (needResize) {
    renderer.setSize(clientWidth, clientHeight, false);
  }
  return needResize;
}

const ResponsiveDesign: React.FC = (): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current } = divRef;
    if (current) {
      current.innerHTML = "";
      current.append(renderer.domElement);
      animate();
    }
  }, []);
  return <div ref={divRef} className="canvasWrapper"></div>;
};
export default ResponsiveDesign;
