import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Fundamentals from "./view/Fundamentals";
import Geo2D from "./view/Geo2D";
import Geo3D from "./view/Geo3D";
import PathCompose from "./view/PathCompose";
import LineGeo from "./view/LineGeo";
import CustomGeo from "./view/CustomGeo";
import IndexGeo from "./view/IndexGeo";
import ComputeNormal from "./view/ComputeNormal";
import UpdateGeo from "./view/UpdateGeo";
import WaveGeo from "./view/WaveGeo";

const App: React.FC = (): JSX.Element => {
  const routing = useRoutes([
    {
      path: "/",
      element: <Fundamentals />,
    },
    {
      path: "Geo2D",
      element: <Geo2D />,
    },
    {
      path: "Geo3D",
      element: <Geo3D />,
    },
    {
      path: "PathCompose",
      element: <PathCompose />,
    },
    {
      path: "LineGeo",
      element: <LineGeo />,
    },
    {
      path: "CustomGeo",
      element: <CustomGeo />,
    },
    {
      path: "IndexGeo",
      element: <IndexGeo />,
    },
    {
      path: "ComputeNormal",
      element: <ComputeNormal />,
    },
    {
      path: "UpdateGeo",
      element: <UpdateGeo />,
    },
    {
      path: "WaveGeo",
      element: <WaveGeo />,
    },
  ]);
  return <>{routing}</>;
};

export default App;
