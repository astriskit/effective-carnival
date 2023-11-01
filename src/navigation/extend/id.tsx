import { RouteObject } from "react-router-dom";
import { CreateInvoice } from "../../features/create-update";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export default {
  path: "/extend/:id",
  element: <CreateInvoice extend/>,
  errorElement: <ErrorBoundary />
} as RouteObject;
