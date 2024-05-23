import { ReactNode } from "react";
import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useLocales from "../../hooks/useLocales";
import { LoadingButton } from "@mui/lab";

export type DialogStateType<T> = {
  open: boolean;
  data?: T;
};

interface CustomDialogPropsType {
  title: string;
  children: ReactNode;
  openDialog: boolean;
  handleCloseDialog?: () => void;
  handleSubmitDialog?: () => void;
  maxWidth?: Breakpoint;
  hasSubmitButton?: boolean;
  submitButtonLoading?: boolean;
  submitButtonDisabled?: boolean;
  submitButtonText?: string;
  submitButtonColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  hasCancelButton?: boolean;
  cancelButtonText?: string;
  customButton?: ReactNode;
}
export const CustomDialog = ({
  children,
  title,
  openDialog,
  handleCloseDialog,
  handleSubmitDialog,
  maxWidth,
  hasSubmitButton = true,
  submitButtonLoading,
  submitButtonDisabled = false,
  submitButtonText,
  submitButtonColor,
  hasCancelButton = true,
  cancelButtonText,
  customButton,
}: CustomDialogPropsType) => {
  const { translate } = useLocales();
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth || "sm"}
      open={openDialog}
      onClose={handleCloseDialog}
      transitionDuration={0}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ mt: 1, pb: 1 }}>{children}</DialogContent>
      <DialogActions>
        {customButton ? customButton : <></>}
        {hasCancelButton && (
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleCloseDialog}
          >
            {cancelButtonText || translate("CANCEL")}
          </Button>
        )}
        {hasSubmitButton && (
          <LoadingButton
            loading={submitButtonLoading}
            disabled={submitButtonDisabled}
            variant="contained"
            color={submitButtonColor || "primary"}
            onClick={handleSubmitDialog}
          >
            {submitButtonText || translate("SAVE")}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};
