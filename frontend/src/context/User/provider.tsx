import { useDataStore } from "hooks";
import React, { useState } from "react";
import { OnlyChildren, User } from "types";
import UserContext from "./context";

const UserContextProvider: React.FC<OnlyChildren> = ({ children }) => {
  const state = useDataStore<User>("/users/");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <UserContext.Provider
      value={{
        state: state,
        modalState: { open, setOpen },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
