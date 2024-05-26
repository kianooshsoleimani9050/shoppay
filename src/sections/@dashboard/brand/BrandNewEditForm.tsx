import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack } from '@mui/material';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField, RHFUploadMultiFile } from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import _ from 'lodash';
import { CreateBrandDto } from 'src/@types/models/create-brand-dto';
import { BrandDto } from 'src/@types/models';

// ----------------------------------------------------------------------

interface FormValuesProps extends CreateBrandDto {}

type Props = {
  isEdit: boolean;
  currentBrand?: BrandDto;
};

export default function BrandNewEditForm({ isEdit, currentBrand }: Props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewBrandSchema = Yup.object().shape({
    title: Yup.string().required('full name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentBrand?.title || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBrand]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBrandSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentBrand) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentBrand]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await (isEdit ? handleUpdateBrand(currentBrand?.id || '', data) : handleCreateBrand(data));
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.brand.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateBrand = async (data: FormValuesProps) => {
    AxiosApi.createBrand({ data }).then(() => console.info('setting has been created!'));
  };

  const handleUpdateBrand = async (id: string, data: FormValuesProps) => {
    AxiosApi.updateBrand({ data }, id).then(() => console.info('successfull'));
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const icon = values.icon || [];

      setValue('icon', [...icon, ...acceptedFiles]);
    },
    [setValue, values.icon]
  );

  const handleRemoveAll = () => {
    setValue('icon', []);
  };

  const handleRemove = (icon: File | string) => {
    const filteredItems =
      values.icon && values.icon?.filter((_icon: string | File) => _icon !== icon);

    setValue('icon', filteredItems);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="title" label="Title" />
              <RHFUploadMultiFile
                name="icon"
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create brand' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
