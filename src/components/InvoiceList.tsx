import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { Invoice } from "../types/Invoice";

type InvoiceId = Invoice["invoiceId"];

type InvoiceListProps = {
  items: Invoice[];
  onEdit: (itemId: InvoiceId) => unknown;
  onRemove: (itemId: InvoiceId) => unknown;
  onView: (itemId: InvoiceId) => unknown;
  onExtend: (itemId: InvoiceId) => unknown;
  onDisplayTotal: (itemId: InvoiceId) => string;
};

export const InvoiceList = (props: InvoiceListProps) => {
  const { items } = props;

  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Invoice</th>
          <th>Billee</th>
          <th>Biller</th>
          <th>Amount</th>
          <th colSpan={4} style={{ textAlign: "center" }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return (
            <tr key={item.invoiceId}>
              <td>{item.invNum}</td>
              <td>
                <Button
                  variant="link"
                  href={`mailto:${item.to.email}`}
                  size="sm"
                  style={{
                    padding: 0,
                  }}
                  title={item.to.email}
                >
                  {item.to.name}
                </Button>
              </td>
              <td>
                <Button
                  variant="link"
                  href={`mailto:${item.from.email}`}
                  size="sm"
                  style={{
                    padding: 0,
                  }}
                  title={item.from.email}
                >
                  {item.from.name}
                </Button>
              </td>
              <td>{props.onDisplayTotal(item.invoiceId)}</td>
              <td style={{ textAlign: "center" }}>
                <ButtonGroup size="sm">
                  <Button onClick={() => props.onView(item.invoiceId)}>
                    View
                  </Button>
                  <Button onClick={() => props.onEdit(item.invoiceId)}>
                    Edit
                  </Button>
                  <Button onClick={() => props.onExtend(item.invoiceId)}>
                    Extend
                  </Button>
                  <Button
                    onClick={() => props.onRemove(item.invoiceId)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
