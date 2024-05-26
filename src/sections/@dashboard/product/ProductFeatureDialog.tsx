import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { CustomDialog, DialogStateType } from "src/components/custom/CustomDialog";

type ProductFeatureDialogPropsType = {
  dialogState: DialogStateType<{}>;
  handleCloseDialog: () => void;
  onSelect: (feature: {
    key: string;
    value: string;
  }) => void;
}

export const ProductFeatureDialog = ({ dialogState, handleCloseDialog, onSelect }: ProductFeatureDialogPropsType) => {
  const [feature, setFeature] = useState({ key: "", value: "" });
  const { open } = dialogState;

  const handleSubmit = () => {
    onSelect(feature);
    handleCloseDialog();
  }

  return (
    <CustomDialog title="Add Feature" openDialog={open} handleCloseDialog={handleCloseDialog}
      handleSubmitDialog={handleSubmit}>
      <Box mt={2}>
        <TextField fullWidth onChange={(e) => {
          setFeature((prev) => ({ key: e.target.value, value: prev.value }));
        }} placeholder="Feature Key" />
        <TextField fullWidth onChange={(e) => {
          setFeature((prev) => ({ value: e.target.value, key: prev.key }));
        }} placeholder="Feature Value" sx={{ mt: 2 }} />
      </Box>
    </CustomDialog>
  )
}