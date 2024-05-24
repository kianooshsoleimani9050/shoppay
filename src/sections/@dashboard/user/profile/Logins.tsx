// @mui
import { Grid, Stack } from '@mui/material';
// @types
import { UserDto } from 'src/@types/models';

// ----------------------------------------------------------------------

type Props = {
  profile: UserDto | undefined;
};

export default function Logins({ profile }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          profile logins
        </Stack>
      </Grid>
    </Grid>
  );
}
