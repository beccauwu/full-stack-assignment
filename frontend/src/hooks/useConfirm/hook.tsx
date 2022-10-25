import { ConfirmContext } from "context";
import { useContext } from "react";

const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  return confirm;
};

export default useConfirm;
