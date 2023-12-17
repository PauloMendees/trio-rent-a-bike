import { Box, styled } from '@mui/material';
import theme from 'styles/theme';

export const StyledDrawer = styled(Box)(() => ({
  backgroundColor: theme.palette.primary.main,
  top: -56,
  borderTopLeftRadius: '30px',
  borderTopRightRadius: '30px',
  visibility: 'visible',
  right: 0,
  left: 0,
  padding: '60px 24px 15px 24px',
}));

export const Puller = styled(Box)(() => ({
  width: 49,
  height: 5,
  backgroundColor: theme.palette.grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
