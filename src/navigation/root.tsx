import { RouteObject } from "react-router-dom";

import dashboard from "./dashboard";
import preview from "./preview/id";
import edit from "./edit/id";
import create from "./create";
import { RootLayout } from "../components/RootLayout";

export default {
  element: <RootLayout />,
  children: [dashboard, preview, edit, create, edit],
} as RouteObject;
