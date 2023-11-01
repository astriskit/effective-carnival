import { RootState } from "../../store/index";
import { Invoice } from "../../types/Invoice";
import { calcTotal } from "../calcTotal";

export const getInvoices = (state: RootState) => state.invoices;

export const getInvoiceById =
  (id: Invoice["invoiceId"]) => (state: RootState) =>
    state.invoices.find(({ invoiceId }) => invoiceId === id);

export const getTotal = (id: Invoice["invoiceId"]) => (s: RootState) => {
  const invoice = getInvoiceById(id)(s);
  if (!invoice) return null;

  return calcTotal(invoice);
};
