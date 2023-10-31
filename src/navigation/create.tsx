import { RouteObject } from "react-router-dom";

import { CreateInvoice } from "../features/create-update";

export default {
  path: "/create",
  element: <CreateInvoice />,
} as RouteObject;
