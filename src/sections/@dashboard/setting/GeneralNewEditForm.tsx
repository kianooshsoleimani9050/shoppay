import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack, MenuItem, TextField } from '@mui/material';
// @mui
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import { SettingDto } from 'src/@types/models';

// ----------------------------------------------------------------------

interface FormValuesProps extends SettingDto {}

type Props = {
  isEdit: boolean;
  currentSetting?: SettingDto;
};

export default function GeneralNewEditForm({ isEdit, currentSetting }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewSettingSchema = Yup.object().shape({
    address: Yup.string(),
    telephone1: Yup.string(),
    telephone2: Yup.string(),
    telegram: Yup.string(),
    instagram: Yup.string(),
    siteAddress: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      address: currentSetting?.value?.address,
      telephone1: currentSetting?.value?.telephone1,
      telephone2: currentSetting?.value?.telephone2,
      telegram: currentSetting?.value?.telegram,
      instagram: currentSetting?.value?.instagram,
      siteAddress: currentSetting?.value?.siteAddress,
    }),
    [currentSetting]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewSettingSchema),
    defaultValues: defaultValues as any,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (isEdit && currentSetting) {
      reset(defaultValues as any);
    }
    if (!isEdit) {
      reset(defaultValues as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentSetting]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await handleCreateSetting(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      console.info(data)
      // navigate(PATH_DASHBOARD.setting.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateSetting = async (data: FormValuesProps) => {
    AxiosApi.createGeneral({ ...(data as any) }).then(() =>
      console.info('setting has been created!')
    );
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
              <RHFTextField name="address" label="آدرس" />
              <RHFTextField name="telephone1" label="تلفن ۱" />
              <RHFTextField name="telephone2" label="تلفن ۲" />
              <RHFTextField name="telegram" label="تلگرام" />
              <RHFTextField name="instagram" label="اینستاگران" />
              <RHFTextField name="siteAddress" label="آدرس سایت" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'ساخت تنظیمات' : 'ذخیره تغییرات'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
