import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const RootLayout = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  const onHome = () => {
    nav("/");
  };

  const onCreateNewInvoice = () => {
    nav("/create");
  };

  const heading =
    pathname === "/create" ? "Create A New Invoice" : "Invoice List";

  const isCreateActive = pathname === "/create";
  const isHomeActive = !isCreateActive;

  return (
    <>
      <ButtonGroup size="sm" style={{ marginTop: 10, marginBottom: 10 }}>
        <Button onClick={onHome} active={isHomeActive}>
          Home
        </Button>
        <Button onClick={onCreateNewInvoice} active={isCreateActive}>
          New
        </Button>
      </ButtonGroup>
      <main>
        <h1>{heading}</h1>
        <Outlet />
      </main>
    </>
  );
};
