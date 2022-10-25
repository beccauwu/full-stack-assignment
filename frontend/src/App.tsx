import React from "react";
import Theme from "./Theme";
import { Base } from "./components";
import { UserContextProvider, ConfirmProvider } from "./context";
import { HomePage } from "./pages";
const App: React.FC = () => {
  return (
    <Theme>
      <ConfirmProvider>
        <UserContextProvider>
          <Base>
            <HomePage />
          </Base>
        </UserContextProvider>
      </ConfirmProvider>
    </Theme>
  );
};

export default App;
