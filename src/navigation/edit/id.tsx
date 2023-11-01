import { RouteObject } from "react-router-dom";
import React from "react";
import { EditInvoice } from "../../features/create-update";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export default {
  path: "/edit/:id",
  element: <EditInvoice />,
  errorElement: <ErrorBoundary />,
} as RouteObject;
