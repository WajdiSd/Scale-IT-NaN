// @mui
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user } = useAuth();

  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, {user?.firstName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Need help?
          <br /> Please do not hesitate to ask Mrs.Brain!
        </Typography>
      </div>

      {
        /*
        <Button href={PATH_DOCS} target="_blank" rel="noopener" variant="contained">
        Documentation
      </Button>
        */
      }
      
    </Stack>
  );
}
