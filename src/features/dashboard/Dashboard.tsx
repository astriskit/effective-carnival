import { useDispatch, useSelector } from "react-redux";
import { displayTwo, getInvoices, useInvoiceById } from "../../utils";
import { InvoiceList } from "../../components/InvoiceList";
import { Invoice } from "../../types/Invoice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { removeInvoice } from "../../store/invoices";

type InvoiceId = Invoice["invoiceId"];

export const Dashboard = () => {
  const invoices = useSelector(getInvoices);
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { getTotal } = useInvoiceById();

  const handleDisplayTotal = (invoiceId: InvoiceId) => {
    const total = getTotal(invoiceId);
    if (!total) throw new Error("Invalid Invoice Id");

    return `${total.currency} ${displayTwo(total.total)}`;
  };

  const handleDownload = (invoiceId: InvoiceId) => {};

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
    nav(`/preview/${invoiceId}`);
  };

  return (
    <InvoiceList
      items={invoices}
      onDisplayTotal={handleDisplayTotal}
      onDownload={handleDownload}
      onEdit={handleEdit}
      onExtend={handleExtend}
      onRemove={handleRemove}
      onView={handleView}
    />
  );
};
