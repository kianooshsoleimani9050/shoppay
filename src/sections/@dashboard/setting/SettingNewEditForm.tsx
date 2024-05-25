import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack, MenuItem, TextField } from '@mui/material'
// @mui
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFTextField,
} from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import { SettingDto } from 'src/@types/models';

// ----------------------------------------------------------------------

interface FormValuesProps extends SettingDto { }

type Props = {
  isEdit: boolean;
  currentSetting?: SettingDto;
};

export default function SettingNewEditForm({ isEdit, currentSetting }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewSettingSchema = Yup.object().shape({
    key: Yup.string().optional(),
    value: Yup.string().required('full name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      key: currentSetting?.key || "",
      value: currentSetting?.value || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSetting]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewSettingSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;


  useEffect(() => {
    if (isEdit && currentSetting) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentSetting]);

  const onSubmit = async (data: FormValuesProps) => {
    try {

      await (isEdit ? handleUpdateSetting(currentSetting?.id || '', data) : handleCreateSetting(data));
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.setting.list);
    } catch (error) {
      console.error(error);
    }
  };


  const handleCreateSetting = async (data: FormValuesProps) => {
    AxiosApi.settingCreate({ ...data as any }).then(() => console.info('setting has been created!'))
  }

  const handleUpdateSetting = async (id: string, data: FormValuesProps) => {
    console.info('ok here it comes', id, data)
    AxiosApi.settingUpdate(id, data).then(() => console.info('successfull'))
  }

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
              <RHFTextField name="key" label="Key" />
              <RHFTextField name="value" label="Value" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Setting' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
