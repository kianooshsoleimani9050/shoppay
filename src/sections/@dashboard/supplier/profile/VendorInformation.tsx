// @mui
import { Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
// @types
import { SupplierDto } from 'src/@types/models';

// ----------------------------------------------------------------------

type Props = {
  supplier: SupplierDto | undefined;
};

export default function SupplierInformation({ supplier }: Props) {
  return (
    <Grid spacing={4}>
      <Card>
        <CardHeader title="Informations" />

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="body2">
            {'Supplier title: '}
            {supplier?.title}
          </Typography>

          <Stack direction="row">
            <Typography variant="body2">
              {'National code: '}
              {supplier?.natinoalCode}
            </Typography>
          </Stack>

          <Stack direction="row">
            <Typography variant="body2">
              {'Mobile: '}
              {supplier?.mobile}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="body2">
              {'Telephone: '}
              {supplier?.telephone}
            </Typography>
          </Stack>

          <Stack direction="row">
            <Typography variant="body2">
              {'Status: '}
              {supplier?.status}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="body2">
              {'Vendor category: '}
              {supplier?.category?.title}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
}
