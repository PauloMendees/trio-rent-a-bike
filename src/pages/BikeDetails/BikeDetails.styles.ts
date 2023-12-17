import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Card,
  CardProps,
  IconButton,
  IconButtonProps,
  styled,
} from '@mui/material';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import theme from 'styles/theme';

export const BreadcrumbContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  margin: '32px 0 32px 100px',

  [theme.breakpoints.down('lg')]: {
    margin: '90px 0 32px 8vw',
  },
}));

export const BreadcrumbHome = styled(HomeOutlined)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: 24,
  fontWeight: 300,
}));

export const BreadcrumbSeparator = styled(ChevronRightOutlined)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: 14,
  fontWeight: 300,
}));

export const Content = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '0 100px 44px',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 24,

  [theme.breakpoints.down('lg')]: {
    padding: '0 20px 44px',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const DetailsContainer = styled(Card)<CardProps>(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  padding: 34,

  [theme.breakpoints.down('lg')]: {
    padding: 24,
  },
}));

export const LikeButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: 20,
  width: 60,
  height: 60,
}));

export const FavoriteIcon = styled(FavoriteBorderOutlined)(({ theme }) => ({
  color: theme.palette.common.black,
}));

export const InfoIcon = styled(InfoOutlined)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

export const OverviewContainer = styled(Card)<CardProps>(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  padding: 34,
  width: '100%',
  maxWidth: '447px',
}));

export const BookingButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 20,
  padding: '18px 0',
  marginTop: 30,
  textTransform: 'none',
  color: theme.palette.common.white,
  fontWeight: 800,
}));

export const PriceRow = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const CalendarContainer = styled(Box)(() => ({
  width: '100%',
  padding: '26px 18px',
  borderRadius: '28px',
  backgroundColor: theme.palette.primary.main,
}));

export const MobileDatePicker = styled('button')(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '0 15px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey[100],
  borderRadius: '30px',
  height: '56px',
  backgroundColor: 'transparent',
  fontWeight: 600,
  fontSize: '16px',
  color: theme.palette.common.black,
}));

export const MobileSelectDateButton = styled(Button)<ButtonProps>(({ theme }) => ({
  marginTop: '66px',
  width: '100%',
  borderRadius: '20px',
  backgroundColor: theme.palette.secondary.main,
  padding: '18px 0',
  fontSize: '16px',
  fontWeight: 800,
  color: theme.palette.common.black,
  textTransform: 'none',
  transition: 'all 0.3s ease-in-out',

  ':active': {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
  },

  ':hover': {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
  },
}));
