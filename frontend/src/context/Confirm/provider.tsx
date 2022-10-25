import React, { useState, useMemo, useCallback } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { OnlyChildren } from "types";
import Context from "./context";
interface FixedArray<T, L extends number> extends Array<T> {
  length: L;
}
type ResolveOrReject = FixedArray<(value?: unknown) => void, 2> | [];

const ConfirmProvider: React.FC<OnlyChildren> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resolveOrReject, setResolveOrReject] = useState<ResolveOrReject>([]);
  const [resolve, reject] = resolveOrReject;
  const open = useMemo(() => resolveOrReject.length === 2, [resolveOrReject]);

  const handleClose = useCallback(() => {
    setResolveOrReject([]);
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve();
      handleClose();
    }
  }, [resolve, handleClose]);

  const handleCancel = useCallback(() => {
    if (reject) {
      reject();
      handleClose();
    }
  }, [reject, handleClose]);

  const confirm = useCallback(
    (params: { title?: string; description?: string }) => {
      return new Promise((resolve, reject) => {
        setTitle(params.title || "");
        setDescription(params.description || "");
        setResolveOrReject([resolve, reject]);
      });
    },
    []
  );

  return (
    <>
      <Context.Provider value={confirm}>{children}</Context.Provider>
      <ConfirmDialog
        open={open}
        title={title}
        description={description}
        onConfirm={handleConfirm}
        onClose={handleClose}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ConfirmProvider;
