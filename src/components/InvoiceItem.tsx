import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ItemRow } from "./ItemRow";

const InvoiceItem = (props: any) => {
  const onItemizedItemEdit = props.onItemizedItemEdit;
  const currency = props.currency;
  const rowDel = props.onRowDel;

  const itemTable = props.items.map(function (item: any) {
    return (
      <ItemRow
        onItemizedItemEdit={onItemizedItemEdit}
        item={item}
        onDelEvent={rowDel}
        key={item.id}
        currency={currency}
      />
    );
  });

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={props.onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

export default InvoiceItem;
