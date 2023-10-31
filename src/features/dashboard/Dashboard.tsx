import { useSelector } from "react-redux";
import { getInvoices } from "../../utils";

export const Dashboard = () => {
  const invoices = useSelector(getInvoices);
  
  return null;
};
