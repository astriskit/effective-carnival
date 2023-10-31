import React from "react";
import { RouteObject } from "react-router-dom";
import { PreviewInvoice } from "../../features/preview";

export default {
  path: "/preview/:id",
  element: <PreviewInvoice />,
} as RouteObject;
