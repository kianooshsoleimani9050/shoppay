import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { UserManager } from '../../../@types/user';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { CustomFile } from '../../../components/upload';
import {
  FormProvider,
  RHFCheckbox,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import { ProductDto, RoleType } from 'src/@types/models';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<Product, 'avatar'> {
  avatar: CustomFile | string | null;
}

interface Product {
  title: string
  summery: string
  description: string
  categoryId: string
  brandId: string
  attributes: any[]
  files: any[]
}

type Props = {
  isEdit: boolean;
  currentProduct?: ProductDto;
};

export default function ProductNewEditForm({ isEdit, currentProduct }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    summery: Yup.string().required('Summery is required').email(),
    description: Yup.string().required('Description is required'),
    categoryId: Yup.string().required('Category is required'),
    brandId: Yup.string().required('Brand is required'),
    attributes: Yup.array(Yup.mixed()).min(1),
    files: Yup.array(Yup.mixed()).min(1),
  });

  const defaultValues = useMemo(
    () => ({
      title: "",
      summery: "",
      description: "",
      categoryId: "",
      brandId: "",
      attributes: [],
      files: [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.info(data);
      await (isEdit ? handleCreateUser(data) : handleCreateUser(data));
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };


  const handleCreateUser = async (data: FormValuesProps) => {
    AxiosApi.handleCreateVendor({ ...data as any }).then(() => console.info('user has been created!'))
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue('avatar',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }) || "");
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

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
              <RHFTextField name="fullName" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="mobile" label="Phone Number" />
              <RHFSelect name="role" label="Role" placeholder="Role">
                {Object.keys(RoleType).map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <RHFCheckbox name="isActive" label="status" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
