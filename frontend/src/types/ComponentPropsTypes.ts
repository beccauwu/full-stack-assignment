import type { GridRowId } from "@mui/x-data-grid";
import { User } from "./UserTypes";

type OnlyChildren = {
  children: React.ReactElement | React.ReactElement[];
};
type GridToolbarProps = {
  rowIds: GridRowId[];
};
type GridFooterProps = {
  rowIds: GridRowId[];
  users: User[];
};
type UserCreateModalProps = {
  open: boolean;
  handleClose: () => void;
};

type LoadingProps = {
  color?: string;
  speedMultiplier?: number;
  className?: string;
};

export type {
  GridToolbarProps,
  GridFooterProps,
  UserCreateModalProps,
  LoadingProps,
  OnlyChildren,
};
