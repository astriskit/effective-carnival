import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { navigation } from "./navigation";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <Container>
          <RouterProvider router={navigation} />
        </Container>
      </div>
    </Provider>
  );
};

export default App;
