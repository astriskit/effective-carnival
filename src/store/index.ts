import { configureStore } from "@reduxjs/toolkit";

import invoices from "./invoices";

export const store = configureStore({
  reducer: {
    invoices,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
