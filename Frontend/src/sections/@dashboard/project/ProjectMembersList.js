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
  CircularProgress,
} from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';
// _mock_
import { _bankingQuickTransfer } from 'src/_mock';
// components
import { CarouselArrows, CarouselDots } from 'src/components/carousel';
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


  //console.log(usersInProject);

  const {usersInProject, isLoading } = useProject();

  
  const getContactInfo = _bankingQuickTransfer.find((_, index) => index === selectContact);
  const sliderSettings = {
    centerMode: true,
    centerPadding: '0px',
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots(),
    focusOnSelect: false,
    beforeChange: (current, next) => setSelectContact(next),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };

  useEffect(() => {
    console.log(usersInProject);
    console.log(isLoading);
    if (amount) {
      handleAutoWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {
        isLoading? 
        ( 
        <Box
          sx={{
            mt: 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={150} color="success" />
        </Box>
        )
        :
        (
          <Box sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Recent
            </Typography>
            {/*
            <Link component={RouterLink} to="#test" sx={{ typography: 'button' }}>
              View All
            </Link>
            */}
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
                  <Box key={contact?._id} sx={{ py: 5, display:'flex!important', justifyContent:'center!important' }}>
                    <Box sx={{ width: 40, height: 40 }}>
                      <Tooltip key={contact?._id} title={contact?.firstName} arrow placement="top">
                        <Avatar
                          src={'/images/avatars/avatar_13.jpg'}
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
        </Box>
        )
        }
        
      </RootStyle>
    </>
  );
}