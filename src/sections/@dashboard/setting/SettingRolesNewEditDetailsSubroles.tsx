// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import { RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function SettingRolesNewEditDetailsSubroles({ globalIndex }:{globalIndex:number}) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${globalIndex}].subrole`,
  });

  const handleAdd = () => {
    append({
      subrole: '',
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Box>
      <Stack spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name={`items[${globalIndex}].subrole[${index}].subrole`}
                label="زیر قانون"
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              حذف زیر قانون
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          اضافه کردن زیر قانون جدید
        </Button>
      </Stack>
    </Box>
  );
}
