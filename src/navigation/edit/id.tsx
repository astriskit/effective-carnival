import { RouteObject } from "react-router-dom";
import React from "react";
import { EditInvoice } from "../../features/create-update";


export default {
  path: "/edit/:id",
  element: <EditInvoice />,
} as RouteObject;
