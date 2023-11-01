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

  const onInfo = () => {
    window.alert(
      "Welcome. You may create invoices for free on this site, that'll stay with you until you clear them. :)"
    );
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
        <Button variant="info" onClick={onInfo}>
          ?
        </Button>
      </ButtonGroup>
      <main
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h1>{getHeading()}</h1>
        <Outlet />
        <footer
          style={{
            display: "flex",
            alignSelf: "flex-end",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "12px" }}>
            Made with <span style={{ color: "red" }}>❤️</span> by&nbsp;
            <a href="https://astriskit-portfolio.wordpress.com/">astriskit</a>
          </p>
        </footer>
      </main>
    </>
  );
};
