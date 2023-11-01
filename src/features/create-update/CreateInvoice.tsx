import { useDispatch } from "react-redux";

import InvoiceForm from "../../components/InvoiceForm";
import { AppDispatch } from "../../store";
import { AddInvoicePayload, addInvoice } from "../../store/invoices";
import { useNavigate, useParams } from "react-router-dom";
import { useInvoiceById } from "../../utils";

export const CreateInvoice = (props: { extend?: boolean }) => {
  const { id } = useParams();
  const { getInvoice } = useInvoiceById();
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  const isExtendMode = id && props.extend;
  const invoice = isExtendMode ? getInvoice(id) : null;
  const formMode = isExtendMode ? "extend" : undefined;

  if (formMode === "extend" && !invoice) {
    throw new Error("Invalid invoice id");
  }

  const handleSave = (inv: AddInvoicePayload) => {
    dispatch(addInvoice(inv));
    alert("The invoice is saved!");
    nav("/");
  };

  return <InvoiceForm onSave={handleSave} prefill={invoice} mode={formMode} />;
};
