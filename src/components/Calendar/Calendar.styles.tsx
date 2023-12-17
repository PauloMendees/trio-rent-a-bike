import { Box, Typography, styled } from '@mui/material';
import theme from 'styles/theme';
import { StyledDayProps } from './types';

export const Container = styled(Box)(() => ({
  maxWidth: '350px',
  width: '100%',
  color: theme.palette.common.white,
  margin: '0 auto',
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
}));

export const ArrowsContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

export const ArrowButtons = styled('button')(({ disabled }) => ({
  padding: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: '1px',
  borderColor: theme.palette.common.white,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderRadius: '20px',
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
}));

export const DaysContainer = styled(Box)(() => ({
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: 'repeat(7, 1fr)',
}));

export const DayOfTheWeek = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '16px',
  opacity: 0.5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DayContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

export const IntervalBackground = styled(Box)(() => ({
  width: '53.5px',
  height: '40px',
  position: 'absolute',
  backgroundColor: theme.palette.primary.contrastText,
}));

export const SelectedDayCircleContainer = styled(Box)<{ startdate?: 'true' | 'false' }>(
  ({ startdate }) => ({
    width: '53.5px',
    height: '40px',
    position: 'absolute',
    background: `linear-gradient(to ${
      startdate === 'true' ? 'right' : 'left'
    }, transparent 0%, transparent 30px, ${theme.palette.primary.contrastText} 30px, ${
      theme.palette.primary.contrastText
    } 100%)`,

    //   backgroundColor: theme.palette.primary.light,
  }),
);

export const SelectedDayCircle = styled(Box)(() => ({
  width: '40px',
  height: '40px',
  position: 'absolute',
  backgroundColor: theme.palette.common.white,
  borderRadius: '99px',
  zIndex: 2,
}));

export const Day = styled('button')<StyledDayProps>(({ isselected, istoday, disabled }) => {
  return {
    zIndex: 3,
    backgroundColor: 'transparent',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 600,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 99,

    ':before':
      istoday === 'true' && isselected === 'false'
        ? {
            content: '""',
            width: '40px',
            height: '40px',
            position: 'absolute',
            backgroundColor: 'transparent',
            border: '1px solid white',
            borderRadius: '99px',
          }
        : {},
  };
});
