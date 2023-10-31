import { RootState } from "../../store/index";
import { Invoice } from "../../types/Invoice";

export const getInvoices = (state: RootState) => state.invoices;

export const getInvoiceById =
  (id: Invoice["invoiceId"]) => (state: RootState) =>
    state.invoices.find(({ invoiceId }) => invoiceId === id);

export const getTotal = (id: Invoice["invoiceId"]) => (s: RootState) => {
  const invoice = getInvoiceById(id)(s);
  if (!invoice) return null;

  const items = invoice.items;
  let subTotal = 0;

  items?.forEach((item) => {
    subTotal = subTotal + item.price * item.qty;
  });

  const discountAmt = subTotal * (invoice.discountRate / 100);
  const taxAmt = subTotal * (invoice.taxRate / 100);

  const total = {
    currency: invoice.currency,
    subTotal: subTotal,
    taxAmmount: taxAmt,
    discountAmmount: discountAmt,
    total: subTotal - discountAmt + taxAmt,
  };
  return total;
};
