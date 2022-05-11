import React from "react";
import { Link } from "react-router-dom";

const Fundamentals: React.FC = (): JSX.Element => {
  return (
    <nav style={{ width: "60%", margin: "auto" }}>
      <h2>Fundamentals 必备知识</h2>
      <ul>
        <li>
          <Link to="/Geo2D">Geo2D 二维几何体</Link>
        </li>
        <li>
          <Link to="/Geo3D">Geo3D 三维几何体</Link>
        </li>
        <li>
          <Link to="/PathCompose">PathCompose 路径合成几何体</Link>
        </li>
        <li>
          <Link to="/LineGeo">LineGeo 线性几何体</Link>
        </li>
        <li>
          <Link to="/CustomGeo">CustomGeo 自定义几何体</Link>
        </li>
        <li>
          <Link to="/IndexGeo">IndexGeo 顶点索引</Link>
        </li>
        <li>
          <Link to="/ComputeNormal">ComputeNormal 计算法线</Link>
        </li>
        <li>
          <Link to="/UpdateGeo">UpdateGeo 更新几何体数据</Link>
        </li>
        <li>
          <Link to="/WaveGeo">WaveGeo 波浪球</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Fundamentals;
