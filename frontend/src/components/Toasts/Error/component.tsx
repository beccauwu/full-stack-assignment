import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { UserContext } from "context";
import React, { useContext, useEffect, useState } from "react";
import { ErrorWithStatus } from "types";

const Error: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorPack, setErrorPack] = useState<ErrorWithStatus[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorWithStatus | undefined>(
    undefined
  );
  const errors = useContext(UserContext).state.errors;
  useEffect(() => {
    if (errors) {
      setErrorPack((prev) => [...prev, ...errors]);
    }
  }, [errors]);
  useEffect(() => {
    if (errorPack.length && !errorMessage) {
      setErrorMessage({ ...errorPack[0] });
      setErrorPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (errorPack.length && errorMessage && open) {
      setOpen(false);
    }
  }, [errorPack, errorMessage, open]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleExited = () => {
    setErrorMessage(undefined);
  };
  return (
    <Snackbar open={open} TransitionProps={{ onExited: handleExited }}>
      <Alert
        severity="error"
        variant="filled"
        action={
          <Button
            color="inherit"
            variant="text"
            size="small"
            onClick={handleClose}
          >
            {errorPack.length ? "NEXT" : "CLOSE"}
          </Button>
        }
      >
        <AlertTitle>{`Error(s) found: ${errorPack.length + 1}`}</AlertTitle>
        <strong>{errorMessage?.status}</strong> - {errorMessage?.message}
      </Alert>
    </Snackbar>
  );
};

export default Error;
