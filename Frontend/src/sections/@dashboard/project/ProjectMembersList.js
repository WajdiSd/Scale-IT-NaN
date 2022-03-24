import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Link,
  Stack,
  Input,
  Button,
  Avatar,
  Dialog,
  Tooltip,
  TextField,
  Typography,
  CardHeader,
  DialogTitle,
  DialogActions,
  Slider as MuiSlider,
} from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';
// _mock_
import { _bankingQuickTransfer } from 'src/_mock';
// components
import { CarouselArrows } from 'src/components/carousel';
import useProject from 'src/hooks/useProject';

// ----------------------------------------------------------------------

const MIN_AMOUNT = 0;
const MAX_AMOUNT = 1000;
const STEP = 50;

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

export default function ProjectMembersList() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const [autoWidth, setAutoWidth] = useState(24);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectContact, setSelectContact] = useState(0);
  const [amount, setAmount] = useState(0);


  console.log("im in project members list");
  //console.log(usersInProject);

  const {usersInProject} = useProject();
  console.log("-----------------------");
  console.log(usersInProject);

  
  const getContactInfo = _bankingQuickTransfer.find((_, index) => index === selectContact);
  const sliderSettings = {
    dots: false,
    arrows: false,
    slidesToShow: 7,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setSelectContact(next),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  useEffect(() => {
    if (amount) {
      handleAutoWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleAutoWidth = () => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 22);
  };

  const handleSliderChange = (event, newValue) => {
    setAmount(newValue);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    }
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <>
      <RootStyle>
        <CardHeader title="Team" />
        <Box sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Recent
            </Typography>
            <Link component={RouterLink} to="#" sx={{ typography: 'button' }}>
              View All
            </Link>
          </Stack>

          <Box sx={{ position: 'relative' }}>
            <CarouselArrows
              filled
              onPrevious={handlePrevious}
              onNext={handleNext}
              customIcon={'eva:arrow-ios-forward-fill'}
              sx={{
                '& .arrow': {
                  mt: '-14px',
                  '&.left': { left: -16 },
                  '&.right': { right: -16 },
                  '& button': { width: 28, height: 28, borderRadius: '50%', p: 0.75 },
                },
              }}
            >
              <Slider ref={carouselRef} {...sliderSettings}>
                {usersInProject?.map((contact, index) => (
                  <Box key={contact._id} sx={{ py: 5 }}>
                    <Box sx={{ width: 40, height: 40 }}>
                      <Tooltip key={contact._id} title={contact.firstName} arrow placement="top">
                        <Avatar
                          src={'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_13.jpg'}
                          sx={{
                            opacity: 0.48,
                            cursor: 'pointer',
                            transition: (theme) => theme.transitions.create('all'),
                            ...(selectContact === index && {
                              opacity: 1,
                              transform: 'scale(1.25)',
                              boxShadow: '-4px 12px 24px 0 rgb(0,0,0,0.24)',
                            }),
                          }}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                ))}
              </Slider>
            </CarouselArrows>
          </Box>

          <Stack spacing={3}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              insert amount
            </Typography>

            <Button variant="contained" size="large" disabled={amount === 0} onClick={handleOpenConfirm}>
              Transfer Now
            </Button>
          </Stack>
        </Box>
      </RootStyle>

      <ConfirmTransferDialog
        open={openConfirm}
        autoWidth={autoWidth}
        amount={amount}
        contactInfo={getContactInfo}
        onClose={handleCloseConfirm}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />
    </>
  );
}

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

ConfirmTransferDialog.propTypes = {
  amount: PropTypes.number,
  autoWidth: PropTypes.any,
  contactInfo: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

function ConfirmTransferDialog({ open, amount, autoWidth, contactInfo, onClose, onBlur, onChange }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>Transfer to</DialogTitle>

      <Stack spacing={3} sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={contactInfo?.avatar} sx={{ width: 48, height: 48 }} />
          <div>
            <Typography variant="subtitle2">{contactInfo?.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {contactInfo?.email}
            </Typography>
          </div>
        </Stack>

        

        <TextField fullWidth multiline rows={2} placeholder="Write a message..." />
      </Stack>
      <DialogActions>
        <Button variant="contained" disabled={amount === 0} onClick={onClose}>
          Confirm & Transfer
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
