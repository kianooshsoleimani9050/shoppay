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
import SettingRolesNewEditDetails from './SettingRolesNewEditDetails';

// ----------------------------------------------------------------------

interface FormValuesProps extends SettingDto {}

type Props = {
  isEdit: boolean;
  currentSetting?: SettingDto;
};

export default function SettingRolesNewEditForm({ isEdit, currentSetting }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewSettingSchema = Yup.object().shape({
    items: Yup.array().of(Yup.object().shape({
      role:Yup.string().required(),
      subrole1:Yup.string().required(),
      subrole2:Yup.string().required(),
    })).min(1)
  });

  const defaultValues = useMemo(
    () => ({
      items: [
        { role: '', subrole1: '', subrole2: '' },
      ],
    }),
    []
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
            <SettingRolesNewEditDetails />
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
