import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
// utils
import cssStyles from '../../utils/cssStyles';
//
import Iconify from '../Iconify';
import { IconButtonAnimate } from '../animate';

import useChat from 'src/hooks/useChat';


// ----------------------------------------------------------------------

const RootStyle = styled('span')(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  right: 0,
  bottom: '5%',
  position: 'fixed',
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '24px 0 20px 24px',
  boxShadow: `-12px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
    0.36
  )}`,
}));

const DotStyle = styled('span')(({ theme }) => ({
  top: 8,
  width: 8,
  height: 8,
  right: 10,
  borderRadius: '50%',
  position: 'absolute',
  backgroundColor: theme.palette.error.main,
}));

// ----------------------------------------------------------------------

ToggleButtonBot.propTypes = {
  notDefault: PropTypes.bool,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
};

export default function ToggleButtonBot({ notDefault, open, onToggle }) {
  const {newMessage} = useChat();
  return (
    <RootStyle>
      {!open && newMessage && <DotStyle />}
      <Tooltip title="Chat" placement="left">
        <IconButtonAnimate
          color="inherit"
          onClick={onToggle}
          sx={{
            p: 1.25,
            transition: (theme) => theme.transitions.create('all'),
            '&:hover': {
              color: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
            },
          }}
        >
          <Iconify icon="carbon:chat-bot" width={20} height={20} />
        </IconButtonAnimate>
      </Tooltip>
    </RootStyle>
  );
}
