import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Basics from "./view/Basics";
import RenderStructure from "./view/RenderStructure";
import ResponsiveDesign from "./view/ResponsiveDesign";
import Illustration from "./view/Illustration";
import Dpr from "./view/Dpr";

const App: React.FC = (): JSX.Element => {
  const routing = useRoutes([
    {
      path: "/",
      element: <Basics />,
    },
    {
      path: "RenderStructure",
      element: <RenderStructure />,
    },
    {
      path: "ResponsiveDesign",
      element: <ResponsiveDesign />,
    },
    {
      path: "Illustration",
      element: <Illustration />,
    },
    {
      path: "Dpr",
      element: <Dpr />,
    },
  ]);
  return <>{routing}</>;
};

export default App;
