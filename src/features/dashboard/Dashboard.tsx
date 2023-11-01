import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  displayTwo,
  formatDate,
  getInvoices,
  useInvoiceById,
} from "../../utils";
import { InvoiceList } from "../../components/InvoiceList";
import { Invoice } from "../../types/Invoice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { removeInvoice } from "../../store/invoices";
import InvoiceModal from "../../components/InvoiceModal";

type InvoiceId = Invoice["invoiceId"];

export const Dashboard = () => {
  const [showInvoiceId, setInvoiceId] = useState("");

  const invoices = useSelector(getInvoices);
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { getTotal, getInvoice } = useInvoiceById();

  const handleDisplayTotal = (invoiceId: InvoiceId) => {
    const total = getTotal(invoiceId);
    if (!total) throw new Error("Invalid Invoice Id");

    return `${total.currency} ${displayTwo(total.total)}`;
  };

  const handleEdit = (invoiceId: InvoiceId) => {
    nav(`/edit/${invoiceId}`);
  };

  const handleExtend = (invoiceId: InvoiceId) => {
    nav(`/extend/${invoiceId}`);
  };

  const handleRemove = (invoiceId: InvoiceId) => {
    dispatch(removeInvoice({ invoiceId }));
  };

  const handleView = (invoiceId: InvoiceId) => {
    setInvoiceId(invoiceId);
  };

  const handleCloseView = () => {
    setInvoiceId("");
  };

  const invoice = showInvoiceId ? getInvoice(showInvoiceId) : null;
  const total = showInvoiceId && !!invoice ? getTotal(showInvoiceId) : null;

  if (showInvoiceId && !invoice && !total) {
    throw new Error("Invalid Invoice Id");
  }

  const viewInvoice = !!invoice && !!total;

  return (
    <>
      <InvoiceList
        items={invoices}
        onDisplayTotal={handleDisplayTotal}
        onEdit={handleEdit}
        onExtend={handleExtend}
        onRemove={handleRemove}
        onView={handleView}
      />
      {viewInvoice && (
        <InvoiceModal
          showModal={true}
          closeModal={handleCloseView}
          info={{
            invoiceNumber: invoice.invNum,
            billFrom: invoice.from.name,
            billFromEmail: invoice.from.email,
            billFromAddress: invoice.from.address,
            billTo: invoice.to.name,
            billToAddress: invoice.to.address,
            billToEmail: invoice.to.name,
            dateOfIssue: formatDate(invoice.date),
            dueDate: formatDate(invoice.dueDate),
            notes: invoice.notes,
          }}
          {...total}
          currency={invoice.currency}
          items={invoice.items.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            quantity: item.qty,
            price: item.price,
          }))}
        />
      )}
    </>
  );
};
