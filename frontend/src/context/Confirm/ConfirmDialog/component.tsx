import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

type ConfirmProps = {
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  title?: string;
  description?: string;
  dialogProps?: DialogProps;
  dialogContentProps?: DialogContentProps;
};

const ConfirmDialog: React.FC<ConfirmProps> = ({
  onClose,
  onCancel,
  onConfirm,
  open,
  title,
  description,
  dialogProps,
  dialogContentProps,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby={description && "dialog-description"}
      {...dialogProps}
    >
      <DialogTitle id="dialog-title">{title ? title : "Confirm?"}</DialogTitle>
      {description && (
        <DialogContent {...dialogContentProps}>
          <DialogContentText id="dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button variant="text" color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="text" color="error" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
