import { InputAdornment, Typography } from '@mui/material';
import {
  Container,
  ErrorMessage,
  Form,
  Input,
  LoginCard,
  SubmitButton,
  Title,
} from './Login.styles';
import { AccountCircle, PasswordOutlined } from '@mui/icons-material';
import { useLogin } from './useLogin';

const Login = () => {
  const { errors, register, onSubmit } = useLogin();

  return (
    <Container data-testid="login-page">
      <LoginCard>
        <Title color="primary" variant="h1">
          Bike Rental
        </Title>
        <Typography>Welcome back, put your information to login</Typography>
        <Form data-testid="form-container" onSubmit={onSubmit}>
          <Input
            data-testid="email-input"
            {...register('email')}
            error={!!errors.email?.message}
            label="Email"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          {errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
          <Input
            data-testid="password-input"
            error={!!errors.password?.message}
            {...register('password')}
            label="Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordOutlined />
                </InputAdornment>
              ),
            }}
          />
          {errors.password?.message && <ErrorMessage>{errors.password?.message}</ErrorMessage>}

          <SubmitButton
            data-testid="login-button"
            type="submit"
            variant="contained"
            disableElevation
            fullWidth
          >
            Login
          </SubmitButton>
        </Form>
      </LoginCard>
    </Container>
  );
};

export default Login;
