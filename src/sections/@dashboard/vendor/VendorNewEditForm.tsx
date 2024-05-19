import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
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
import { RoleType, VendorDto, VendorDtoStatusEnum } from 'src/@types/models';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<Vendor, 'avatar'> {}

interface Vendor {
  natinoalCode: string;
  telephone: string;
  mobile: string;
  status: VendorDtoStatusEnum;
  balance: number;
  idCardImage: string;
  businessLicense: string;
  otherLincense: string;
  categoryId: string;
}

type Props = {
  isEdit: boolean;
  currentVendor?: VendorDto;
};

export default function VendorNewEditForm({ isEdit, currentVendor }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewVendorSchema = Yup.object().shape({
    natinoalCode: Yup.string().required('full name is required'),
    telephone: Yup.string().required('Email is required').email(),
    mobile: Yup.string().required('Phone number is required'),
    status: Yup.string().required('status is required'),
    balance: Yup.string().required('role is required'),
    categoryId: Yup.string().required(''),
  });

  const defaultValues = useMemo(
    () => ({
      natinoalCode: currentVendor?.natinoalCode || '',
      telephone: currentVendor?.telephone || '',
      mobile: currentVendor?.mobile || '',
      status: currentVendor?.status || VendorDtoStatusEnum.Accepted,
      balance: currentVendor?.balance || 0,
      categoryId: currentVendor?.categoryId || '',
    }),
    [currentVendor]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewVendorSchema),
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
    if (isEdit && currentVendor) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentVendor]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
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
    AxiosApi.handleCreateVendor({}).then(() => console.info('user has been created!'));
  };

  const handleUpdateUser = async (data: FormValuesProps) => {
    AxiosApi.handleUpdateVendor({}).then((res) => console.info(res));
  };

  // const handleDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];

  //     if (file) {
  //       setValue(
  //         'avatar',
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         }) || ''
  //       );
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status !== VendorDtoStatusEnum.Accepted ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                // onDrop={handleDrop}
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

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== VendorDtoStatusEnum.Accepted}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

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
