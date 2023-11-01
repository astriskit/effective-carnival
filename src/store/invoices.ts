import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { Invoice } from "../types/Invoice";

type InvoiceId = Pick<Invoice, "invoiceId">;
export type AddInvoicePayload = Omit<Invoice, "invoiceId" | "createdAt" | "updatedAt">;
export type EditInvoicePayload = Omit<Invoice, "invoiceId" | "updatedAt">;

const initialState = [] as Invoice[];

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: {
      reducer: (state, action: PayloadAction<Invoice>) => {
        state.push(action.payload);
      },
      prepare: (inv: AddInvoicePayload) => ({
        payload: {
          ...inv,
          invoiceId: nanoid(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      }),
    },
    removeInvoice: (state, action: PayloadAction<InvoiceId>) => {
      return state.filter(
        ({ invoiceId }) => action.payload.invoiceId !== invoiceId
      );
    },
    editInvoice: {
      reducer: (state, action: PayloadAction<Invoice>) => {
        const inv = state.find(
          (inv) => inv.invoiceId === action.payload.invoiceId
        );
        if (!inv) throw new Error("Invalid invoice id");
        Object.assign(inv, action.payload);
      },
      prepare: (invId: string, action: EditInvoicePayload) => ({
        payload: {
          ...action,
          invoiceId: invId,
          updatedAt: Date.now(),
        },
      }),
    },
  },
});

export const { addInvoice, removeInvoice, editInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
