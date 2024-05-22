import { Stack, InputAdornment, TextField } from '@mui/material';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------

type Props = {
  filterString: string;
  onFilterString: (value: string) => void;
};

export default function CategoryTableToolbar({
  filterString,
  onFilterString,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        value={filterString}
        onChange={(event) => onFilterString(event.target.value)}
        placeholder="Search category..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
