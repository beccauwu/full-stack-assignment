import { State } from "./DataStoreTypes";
import { User } from "./UserTypes";

type UserContextType = {
  state: State<User>;
  modalState: {
    open: boolean;
    setOpen: (open: boolean) => void;
  };
};
type ConfirmContextType = (params: {
  title?: string;
  description?: string;
}) => Promise<unknown>;

export type { UserContextType, ConfirmContextType };
