import { RouteObject } from "react-router-dom";
import { Dashboard } from "../features/dashboard";

export default {
  path: "/",
  index: true,
  element: <Dashboard />,
} as RouteObject;
