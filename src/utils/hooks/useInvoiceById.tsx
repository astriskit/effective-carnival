import { useStore } from "react-redux";
import { RootState } from "../../store";
import { getInvoiceById, getTotal } from "../selectors";

export const useInvoiceById = () => {
  const store = useStore<RootState>();

  return {
    getTotal: (id: string) => getTotal(id)(store.getState()),
    getInvoice: (id: string) => getInvoiceById(id)(store.getState()),
  };
};
