import { useDispatch } from "react-redux";

import InvoiceForm from "../../components/InvoiceForm";
import { AppDispatch } from "../../store";
import { EditInvoicePayload, editInvoice } from "../../store/invoices";
import { useNavigate, useParams } from "react-router-dom";
import { useInvoiceById } from "../../utils";

export const EditInvoice = () => {
  const { id } = useParams();
  const { getInvoice } = useInvoiceById();
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  if (!id) {
    throw new Error("Invoice-id not preset");
  }

  const invoice = getInvoice(id);

  if (!invoice) {
    throw new Error("Invalid invoice id");
  }

  const handleSave = (inv: EditInvoicePayload) => {
    dispatch(editInvoice(id, inv));
    alert("The invoice is updated!");
    nav("/");
  };

  return <InvoiceForm onSave={handleSave} prefill={invoice} mode="update" />;
};
