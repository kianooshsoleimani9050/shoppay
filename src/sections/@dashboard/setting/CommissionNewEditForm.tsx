import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
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
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import { CommissionDto } from 'src/@types/models';

// ----------------------------------------------------------------------

interface FormValuesProps extends CommissionDto {}

type Props = {
  isEdit: boolean;
  currentCommission?: CommissionDto;
};

export default function CommissionNewEditForm({ isEdit, currentCommission }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewCommissionSchema = Yup.object().shape({
    percentage: Yup.string(),
    lessThan: Yup.string(),
    moreThan: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      percentage: currentCommission?.percentage || 0,
      lessThan: currentCommission?.lessThan || 0,
      moreThan: currentCommission?.moreThan || 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCommission]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewCommissionSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (isEdit && currentCommission) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCommission]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await handleUpdateOrCreate(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateOrCreate = async (data: FormValuesProps) => {
    AxiosApi.createOrUpdateCommission(data).then(() => console.info('successfull'));
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
              <RHFTextField name="percentage" label="Percentage" />
              <RHFTextField name="lessThan" label="Less than" />
              <RHFTextField name="moreThan" label="More than" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Commission' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
