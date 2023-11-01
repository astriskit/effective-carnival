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

  const getHeading = () => {
    let heading = "";
    switch (pathname) {
      case "/create":
        heading = "Create A New Invoice";
        break;
      case "/":
        heading = "Invoice List";
        break;
    }

    if (pathname.includes("edit")) {
      heading = "Update Invoice";
    } else if (pathname.includes("preview")) {
      heading = "View Invoice";
    } else if (pathname.includes("extend")) {
      heading = "Make Invoice Like";
    }

    return heading;
  };

  const onBack = () => {
    window.history.back();
  };

  const canGoBack = pathname !== "/";
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
        <Button onClick={onBack} disabled={!canGoBack}>
          Go Back
        </Button>
      </ButtonGroup>
      <main>
        <h1>{getHeading()}</h1>
        <Outlet />
      </main>
    </>
  );
};
