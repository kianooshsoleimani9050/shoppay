import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  MenuItem,
  Stack,
} from '@mui/material';
// @types
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import { CustomDialog, DialogStateType } from 'src/components/custom/CustomDialog';
import { CreateSliderDtoTypeEnum } from 'src/@types/models';
import { LoadingButton } from '@mui/lab';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'src/utils/constant';

// ----------------------------------------------------------------------
type Props = {
  isEdit: boolean;
  dialogState: DialogStateType<any>;
  handleCloseDialog: () => void;
};

export default function SettingNewEditBanner({ isEdit, dialogState, handleCloseDialog }: Props) {
  const { open, data } = dialogState;

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    alt: Yup.string().required('Alt is required'),
    type: Yup.string().required('Type is required'),
    icon: Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      title: data?.title || "",
      description: data?.description || "",
      alt: data?.alt || "",
      type: data?.type || "",
      icon: null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const methods = useForm<any>({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await handleCreateSlider(data);
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateSlider = async (data: any) => {
    await AxiosApi.postSliders({ data } as any).then(() => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SLIDER.LIST]
      })
      handleCloseDialog();
    });
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'icon',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <CustomDialog title="Add Feature" openDialog={open} handleCloseDialog={handleCloseDialog}
      hasSubmitButton={false}
      hasCancelButton={false}
    >
      <Box mt={2}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField name="title" label="Title" />
            <RHFTextField name="description" label="Description" />
            <RHFTextField name="alt" label="Alt" />
            <RHFSelect name="type" label="Type">
              {Object.keys(CreateSliderDtoTypeEnum)?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFUploadSingleFile
              name="icon"
              onDrop={handleDrop}
            />
          </Stack>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'Create product' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </CustomDialog>
  );
}
