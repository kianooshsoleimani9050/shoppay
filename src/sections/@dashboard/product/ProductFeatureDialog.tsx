import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { CustomDialog, DialogStateType } from "src/components/custom/CustomDialog";

type ProductFeatureDialogPropsType = {
  dialogState: DialogStateType<{}>;
  handleCloseDialog: () => void;
  onSelect: (feature: string) => void;
}

export const ProductFeatureDialog = ({ dialogState, handleCloseDialog, onSelect }: ProductFeatureDialogPropsType) => {
  const [feature, setFeature] = useState("");
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
          setFeature(e.target.value);
        }} placeholder="Feature name" />
      </Box>
    </CustomDialog>
  )
}