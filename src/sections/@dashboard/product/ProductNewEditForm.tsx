import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Stack,
  Typography,
  MenuItem,
  FormLabel,
  IconButton,
  Button,
} from '@mui/material';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
// components
import { CustomFile } from '../../../components/upload';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
import AxiosApi from 'src/utils/axios';
import { BrandDto, CategoryDto, ProductDto } from 'src/@types/models';
import { DialogStateType } from 'src/components/custom/CustomDialog';
import { ProductFeatureDialog } from './ProductFeatureDialog';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<Product, 'avatar'> {
  avatar: CustomFile | string | null;
}

interface Product {
  title: string;
  summery: string;
  description: string;
  categoryId: string;
  brandId: string;
  attributes: Record<string, any>;
  files: any[];
}

type Props = {
  isEdit: boolean;
  currentProduct?: ProductDto;
};

export default function ProductNewEditForm({ isEdit, currentProduct }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    summery: Yup.string().required('Summery is required'),
    description: Yup.string().required('Description is required'),
    categoryId: Yup.string().required('Category is required'),
    brandId: Yup.string().required('Brand is required'),
    attributes: Yup.mixed().required('Attributes is required'),
    files: Yup.array(Yup.mixed()).min(1),
  });

  const defaultValues = useMemo(
    () => ({
      title: '',
      summery: '',
      description: '',
      categoryId: '',
      brandId: '',
      attributes: {},
      files: [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const [brands, setBrands] = useState<BrandDto[]>([]);
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
  useEffect(() => {
    AxiosApi.brandList()
      .then((res) => {
        setBrands(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [features, setFeatures] = useState<
    {
      key: string;
      value: string;
    }[]
  >([]);

  const handleAddFeature = (feature: { key: string; value: string }) => {
    setFeatures((prev) => [...prev, feature]);
  };

  const handleRemoveFeature = (selectedFeatureKey: string) => {
    setFeatures((prev) => prev.filter((feature) => feature.key !== selectedFeatureKey));
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProductSchema),
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
      await (isEdit ? handleCreateProduct(data) : handleCreateProduct(data));
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.product.list);
    } catch (error) {
      console.error(error);
    }
  };

  const [openFormDialog, setOpenFormDialog] = useState<DialogStateType<{}>>({
    open: false,
  });

  const handleOpenAddDialog = () => {
    setOpenFormDialog({ open: true });
  };

  const handleCloseDialog = () => {
    setOpenFormDialog({ open: false });
  };

  const handleCreateProduct = async (data: FormValuesProps) => {
    AxiosApi.postProduct({ data });
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.files || [];

      setValue('files', [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.files]
  );

  const handleRemoveAll = () => {
    setValue('files', []);
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = values.files && values.files?.filter((_file) => _file !== file);

    setValue('files', filteredItems);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            {/* attributes */}
            <RHFTextField name="title" label="Title" />
            <RHFTextField name="summery" label="Summery" />
            <RHFTextField name="description" label="Description" />
            <RHFSelect name="categoryId" label="Category">
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="brandId" label="Brand">
              {brands.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </RHFSelect>
            <Box />
            <RHFUploadMultiFile
              name="files"
              onDrop={handleDrop}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
            />
            <Box />
            <Stack spacing={2} mt={2}>
              <FormLabel>Features</FormLabel>
              {features.map((feature) => (
                <Stack
                  key={feature.key}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" flexGrow={1} noWrap>
                    {feature.key} - {feature.value}
                  </Typography>
                  <IconButton color="error">
                    <Iconify
                      icon="eva:trash-2-outline"
                      width={24}
                      height={24}
                      onClick={() => {
                        handleRemoveFeature(feature.key);
                      }}
                    />
                  </IconButton>
                </Stack>
              ))}
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Iconify icon="ic:round-add" width={24} height={24} />}
                  onClick={handleOpenAddDialog}
                >
                  Add New Feature
                </Button>
              </Box>
            </Stack>
            <Box />
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'Create product' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </FormProvider>
      <ProductFeatureDialog
        dialogState={openFormDialog}
        handleCloseDialog={handleCloseDialog}
        onSelect={handleAddFeature}
      />
    </>
  );
}
