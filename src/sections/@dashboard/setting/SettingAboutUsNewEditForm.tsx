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
import { FormProvider, RHFEditor, RHFTextField } from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import { SettingDto } from 'src/@types/models';
import SettingRolesNewEditDetails from './SettingRolesNewEditDetails';

// ----------------------------------------------------------------------

interface FormValuesProps extends SettingDto {}

type Props = {
  isEdit: boolean;
  aboutus?: SettingDto;
};

export default function SettingAboutUsNewEditForm({ isEdit, aboutus }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewSettingSchema = Yup.object().shape({
    value:Yup.string().required(),
  });

  const defaultValues = useMemo(
    () => ({
      value:aboutus?.value || ""
    }),
    [aboutus]
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
    if (isEdit && aboutus) {
      reset(defaultValues as any);
    }
    if (!isEdit) {
      reset(defaultValues as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, aboutus]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await handleCreateSetting(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // navigate(PATH_DASHBOARD.setting.list);
    } catch (error) {
    }
  };

  const handleCreateSetting = async (data: FormValuesProps) => {
    AxiosApi.createAboutus({ ...(data as any) }).then(() =>
      console.info('setting has been created!')
    );
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <RHFEditor name='value' />
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {'ذخیره تغییرات'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
