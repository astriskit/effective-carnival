import { RouteObject } from "react-router-dom";

import dashboard from "./dashboard";
import edit from "./edit/id";
import create from "./create";
import extend from "./extend/id";
import { RootLayout } from "../components/RootLayout";

export default {
  element: <RootLayout />,
  children: [dashboard, edit, create, extend],
} as RouteObject;
