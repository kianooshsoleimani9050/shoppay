import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import SettingRolesNewEditDetails from './SettingRolesNewEditDetails';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
  currentSetting?: any;
};

export default function SettingRolesNewEditForm({ isEdit, currentSetting }: Props) {
  const data = currentSetting?.map((rule: any) => {
    const subrole = rule.rules?.map((st: any) => ({
      subrole: st,
    }));
    return {
      role: rule.title,
      subrole: subrole,
    };
  });

  const { enqueueSnackbar } = useSnackbar();

  const NewSettingSchema = Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        role: Yup.mixed(),
        subrole: Yup.array(Yup.mixed()),
      })
    ),
  });

  const defaultValues = useMemo(
    () => ({
      items: data,
    }),
    [data]
  );

  const methods = useForm<typeof defaultValues>({
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

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await handleCreateSetting(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      console.info(data);
      // navigate(PATH_DASHBOARD.setting.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateSetting = async (data: typeof defaultValues) => {
    const newData = data?.items?.map((item: any) => {
      const rules = item?.subrole?.map((sr: any) => sr?.subrole);
      return {
        title: item.role,
        rules,
      };
    });

    AxiosApi.createRule({ bulk: newData as any }).then(() =>
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
                {!isEdit ? 'ساخت قوانین' : 'ذخیره تغییرات'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
