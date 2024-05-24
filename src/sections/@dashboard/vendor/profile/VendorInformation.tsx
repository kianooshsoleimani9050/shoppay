// @mui
import { Card, CardHeader, Grid, Stack, StepLabel, Typography } from '@mui/material';
// @types
import { UserDto, VendorDto } from 'src/@types/models';
import SvgIconStyle from 'src/components/SvgIconStyle';

// ----------------------------------------------------------------------

type Props = {
  vendor: VendorDto | undefined;
};

export default function VendorInformation({ vendor }: Props) {
  return (
    <Grid spacing={4}>
      <Card>
        <CardHeader title="Informations" />

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="body2">
            {'Vendor title: '}
            {vendor?.title}
          </Typography>

          <Stack direction="row">
            <Typography variant="body2">
              {'National code: '}
              {vendor?.natinoalCode}
            </Typography>
          </Stack>

          <Stack direction="row">
            <Typography variant="body2">
              {'Mobile: '}
              {vendor?.mobile}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="body2">
              {'Telephone: '}
              {vendor?.telephone}
            </Typography>
          </Stack>

          <Stack direction="row">
            <Typography variant="body2">
              {'Status: '}
              {vendor?.status}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="body2">
              {'Vendor balance: '}
              {vendor?.balance || 0}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="body2">
              {'Vendor category: '}
              {vendor?.category?.title}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
}
