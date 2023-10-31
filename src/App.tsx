import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import Container from "react-bootstrap/Container";
import { RouterProvider } from "react-router-dom";
import { navigation } from "./navigation";

const App = () => {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <RouterProvider router={navigation} />
      </Container>
    </div>
  );
};

export default App;
