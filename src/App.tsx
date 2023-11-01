import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "react-bootstrap/Spinner";

import { navigation } from "./navigation";
import { store, persistor } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <Container>
          <PersistGate persistor={persistor} loading={<Spinner />}>
            <RouterProvider router={navigation} />
          </PersistGate>
        </Container>
      </div>
    </Provider>
  );
};

export default App;
