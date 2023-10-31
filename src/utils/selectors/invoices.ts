import { RootState } from "../../store/index";
import { Invoice } from "../../types/Invoice";

export const getInvoices = (state: RootState) => state.invoices;

export const getInvoiceById =
  (id: Invoice["invoiceId"]) => (state: RootState) =>
    state.invoices.find(({ invoiceId }) => invoiceId === id);
