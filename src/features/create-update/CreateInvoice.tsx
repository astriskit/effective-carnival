import { useDispatch } from "react-redux";
import InvoiceForm from "../../components/InvoiceForm";
import { AppDispatch } from "../../store";
import { AddInvoicePayload, addInvoice } from "../../store/invoices";
import { useNavigate } from "react-router-dom";

export const CreateInvoice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate()

  const handleSave = (inv: AddInvoicePayload) => {
    dispatch(addInvoice(inv));
    alert("The invoice is saved!")
    nav('/');
  };

  return <InvoiceForm onSave={handleSave} />;
};
