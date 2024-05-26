import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import { CategoryDto, CreateCategoryDto } from 'src/@types/models';
import _ from 'lodash';

// ----------------------------------------------------------------------

interface FormValuesProps extends CreateCategoryDto {}

type Props = {
  isEdit: boolean;
  currentCategory?: CategoryDto;
};

export default function CategoryNewEditForm({ isEdit, currentCategory }: Props) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  useEffect(() => {
    AxiosApi.categoryList({})
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const { enqueueSnackbar } = useSnackbar();

  const NewCategorySchema = Yup.object().shape({
    parentId: Yup.string().optional(),
    title: Yup.string().required('full name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      parentId: currentCategory?.parentId || undefined,
      title: currentCategory?.title || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCategory]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewCategorySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentCategory) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCategory]);

  const onSubmit = async (data: FormValuesProps) => {
    if (data.parentId === undefined) {
      delete data.parentId;
    }

    try {
      await (isEdit
        ? handleUpdateCategory(currentCategory?.id || '', data)
        : handleCreateCategory(data));
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.category.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async (data: FormValuesProps) => {
    console.info(data, 'wtfffff is goin onnnn');
    AxiosApi.createCategory({ data }).then(() => console.info('setting has been created!'));
  };

  const handleUpdateCategory = async (id: string, data: FormValuesProps) => {
    AxiosApi.updateCategory({ ...data, id } as any).then(() => console.info('successfull'));
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
    const filteredItems = values.icon && values.icon?.filter((_icon) => _icon !== icon);

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
              <RHFSelect name="parentId" label="Parent">
                {undefined}
                {categories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFUploadMultiFile
                name="icon"
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Category' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
