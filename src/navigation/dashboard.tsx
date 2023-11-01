import { RouteObject } from "react-router-dom";
import { Dashboard } from "../features/dashboard";
import { ErrorBoundary } from "../components/ErrorBoundary";

export default {
  path: "/",
  index: true,
  element: <Dashboard />,
  errorElement: <ErrorBoundary />,
} as RouteObject;
