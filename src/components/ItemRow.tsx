import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import React from "react";

export const ItemRow = (props: any) => {
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };
  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: props.item.name,
            id: props.item.id,
          }}
        />
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: props.item.description,
            id: props.item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: props.item.quantity,
            id: props.item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            leading: props.currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: props.item.price,
            id: props.item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent.bind(this)}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};
