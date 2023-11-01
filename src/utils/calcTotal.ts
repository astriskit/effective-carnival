import { Invoice } from "../types/Invoice";

export const calcTotal = (
  invoice: Pick<Invoice, "items" | "taxRate" | "currency" | "discountRate">
) => {
  let subTotal = 0;

  invoice?.items?.forEach((item) => {
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
