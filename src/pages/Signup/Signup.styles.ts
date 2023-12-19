import { Box, Button, TextField, Typography, styled } from '@mui/material';
import theme from 'styles/theme';

export const Container = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    padding: '0 4vw',
  },
}));

export const SignupCard = styled(Box)(() => ({
  maxWidth: '500px',
  padding: '24px',
  width: '100%',
  boxShadow: '0px 10px 70px 0px rgba(0, 0, 0, 0.2)',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const Title = styled(Typography)(() => ({
  fontSize: '24px',
}));

export const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const Input = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    borderRadius: '12px',
  },
}));

export const SubmitButton = styled(Button)(() => ({
  borderRadius: 20,
  padding: '16px 0',
  marginTop: 12,
  textTransform: 'none',
  color: theme.palette.common.white,
  fontWeight: 800,
}));

export const ErrorMessage = styled(Typography)(() => ({
  fontSize: '12px',
  color: theme.palette.error.main,
  marginTop: '-8px',
}));
