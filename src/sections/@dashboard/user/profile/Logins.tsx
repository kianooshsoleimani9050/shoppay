// @mui
import { Card, CardHeader, Grid, Stack, StepLabel, Typography } from '@mui/material';
// @types
import { UserDto } from 'src/@types/models';
import SvgIconStyle from 'src/components/SvgIconStyle';

// ----------------------------------------------------------------------

type Props = {
  profile: UserDto | undefined;
};

export default function Logins({ profile }: Props) {
  console.info(profile?.isActive)
  return (
    <Grid spacing={4}>
      <Card>
      <CardHeader title="Informations" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{'Full name: '}{profile?.fullName}</Typography>

        <Stack direction="row">
          <Typography variant="body2">
              {'E-mail: '}{profile?.email}
          </Typography>
        </Stack>

        <Stack direction="row">
          <Typography variant="body2">{'Mobile: '}{profile?.mobile}</Typography>
        </Stack>

        <Stack direction="row">
          <Typography variant="body2">
            {'Role: '}{profile?.role}
          </Typography>
        </Stack>

        <Stack direction="row">
          <Typography variant="body2">
            {'User status: '}{Boolean(profile?.isActive) === true ? 'active' : 'de-active'}
          </Typography>
        </Stack>
      </Stack>
      </Card>
    </Grid>
  );
}
