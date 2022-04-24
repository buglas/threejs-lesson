import React from "react";
import { Link } from "react-router-dom";

const Basics: React.FC = (): JSX.Element => {
  return (
    <nav style={{ width: "60%", margin: "auto" }}>
      <h2>three.js 基础示例</h2>
      <ul>
        <li>
          <Link to="/RenderStructure">RenderStructure 渲染结构</Link>
        </li>
        <li>
          <Link to="/ResponsiveDesign">ResponsiveDesign 响应式设计</Link>
        </li>
        <li>
          <Link to="/Illustration">Illustration 三维插图</Link>
        </li>
        <li>
          <Link to="/Dpr">Dpr 自适应设备分辨率</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Basics;
