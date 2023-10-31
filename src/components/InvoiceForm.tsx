import React, { useCallback, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import { nanoid } from "@reduxjs/toolkit";
import { AddInvoicePayload, EditInvoicePayload } from "../store/invoices";

const parseIfString = (s: string | number, parseFn: (s: string) => number) => {
  if (typeof s === "number") return s;
  return parseFn(s);
};

const parseIfStringToFloat = (s: string | number) => {
  return parseIfString(s, parseFloat);
};

const displayTwo = (s: string | number) => {
  return parseIfStringToFloat(s).toFixed(2);
};

type InvoiceFormProps = {
  onSave(inv: AddInvoicePayload | EditInvoicePayload): void;
};

const InvoiceForm = (props: InvoiceFormProps) => {
  const [state, setState] = useState({
    isOpen: false,
    currency: "$",
    currentDate: "",
    invoiceNumber: 1,
    dateOfIssue: "",
    billTo: "",
    billToEmail: "",
    billToAddress: "",
    billFrom: "",
    billFromEmail: "",
    billFromAddress: "",
    notes: "",
    taxRate: 0,
    discountRate: 0,
    total: 0.0,
    subTotal: 0.0,
    taxAmmount: 0.0,
    discountAmmount: 0.0,
    items: [
      {
        id: nanoid(),
        name: "",
        description: "",
        price: 1.0,
        quantity: 1,
      },
    ],
  });

  const handleCalculateTotal = useCallback((s: typeof state) => {
    var items = s.items;
    var subTotal = 0;

    items?.forEach((item) => {
      subTotal = subTotal + item.price * item.quantity;
    });

    const newState = {
      ...s,
      subTotal: subTotal,
      taxAmmount: subTotal * (s.taxRate / 100),
      discountAmmount: subTotal * (s.discountRate / 100),
      total: subTotal - s.discountAmmount + s.taxAmmount,
    };
    return newState;
  }, []);

  const updateTotal = useCallback(() => {
    const newState = handleCalculateTotal(state);
    if (
      state.total === newState.total &&
      state.subTotal === newState.subTotal &&
      state.taxAmmount === newState.taxAmmount &&
      state.discountAmmount === newState.discountAmmount
    ) {
      return;
    }
    setState(newState);
  }, [state]);

  useEffect(() => {
    updateTotal();
  }, [state]);

  function handleRowDel(items: any) {
    const index = state.items.indexOf(items);
    state.items.splice(index, 1);
    setState({ ...state });
  }

  function handleAddEvent() {
    const id = nanoid();
    const items = {
      id: id,
      name: "",
      description: "",
      price: 1.0,
      quantity: 1,
    };
    state.items.push(items);
    setState({ ...state });
  }

  function onItemizedItemEdit(evt: any) {
    const item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    const items = state.items.slice();
    const newItems = items.map(function (items) {
      for (var key in items) {
        if (key === item.name && items.id === item.id) {
          // @ts-ignore
          items[key] = item.value;
        }
      }
      return items;
    });
    setState({ ...state, items: newItems });
  }

  const editField = (event: any) => {
    console.log(event.target.name, event.target.value, "edit-field");
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onCurrencyChange = (selectedOption: any) => {
    setState({ ...state, ...selectedOption });
  };

  const openModal = (event: any) => {
    event.preventDefault();
    setState({ ...state, isOpen: true });
  };

  const closeModal = () => setState({ ...state, isOpen: false });

  const shapeInv = () => {
    const dueDate = new Date(state.dateOfIssue).valueOf();

    const shape = {
      invNum: state.invoiceNumber,
      date: Date.now(),
      dueDate,
      to: {
        name: state.billTo,
        email: state.billToEmail,
        address: state.billToAddress,
      },
      from: {
        name: state.billFrom,
        email: state.billFromEmail,
        address: state.billFromAddress,
      },
      items: state.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        qty: item.quantity,
        price: item.price,
      })),
      currency: state.currency,
      taxRate: state.taxRate,
      discountRate: state.discountRate,
      notes: state.notes,
    };

    return shape;
  };

  const handleSave = () => {
    if (!props.onSave) return;
    const invDto = shapeInv();
    props.onSave(invDto);
  };

  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={state.dateOfIssue}
                    name={"dateOfIssue"}
                    onChange={editField}
                    style={{
                      maxWidth: "150px",
                    }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={state.invoiceNumber}
                  name={"invoiceNumber"}
                  onChange={editField}
                  min="1"
                  style={{
                    maxWidth: "70px",
                  }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice to?"}
                  //@ts-ignore
                  rows={3}
                  value={state.billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={state.billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={editField}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={state.billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={editField}
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice from?"}
                  //@ts-ignore
                  rows={3}
                  value={state.billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={state.billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={editField}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={state.billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={editField}
                  required
                />
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={state.currency}
              items={state.items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {state.currency}
                    {displayTwo(state.subTotal)}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">
                      ({displayTwo(state.discountRate) || 0}%)
                    </span>
                    {state.currency}
                    {displayTwo(state.discountAmmount) || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small ">({state.taxRate || 0}%)</span>
                    {state.currency}
                    {displayTwo(state.taxAmmount) || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{
                    fontSize: "1.125rem",
                  }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {state.currency}
                    {displayTwo(state.total) || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={state.notes}
              onChange={editField}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">
              Review Invoice
            </Button>
            <InvoiceModal
              showModal={state.isOpen}
              closeModal={closeModal}
              //@ts-ignore FIX_ME
              info={state}
              items={state.items}
              currency={state.currency}
              subTotal={displayTwo(state.subTotal)}
              taxAmmount={displayTwo(state.taxAmmount)}
              discountAmmount={displayTwo(state.discountAmmount)}
              total={displayTwo(state.total)}
              onSave={handleSave}
            />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(event) =>
                  onCurrencyChange({ currency: event.target.value })
                }
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={displayTwo(state.taxRate)}
                  onChange={editField}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.25"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={displayTwo(state.discountRate)}
                  onChange={editField}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.25"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
