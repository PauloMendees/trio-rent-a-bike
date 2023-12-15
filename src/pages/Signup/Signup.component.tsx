'use client';

import { CircularProgress, InputAdornment, Typography } from '@mui/material';
import {
  Container,
  SignupCard,
  Title,
  ErrorMessage,
  Form,
  Input,
  SubmitButton,
} from './Signup.styles';
import { AccountCircle, PasswordOutlined } from '@mui/icons-material';
import { useSignup } from './useSignup';

export const Signup = () => {
  const { errors, onSubmit, register, loading } = useSignup();

  return (
    <Container>
      <SignupCard>
        <Title color="primary" variant="h1">
          Bike Rental
        </Title>
        <Typography>Welcome, put your informations to register</Typography>
        <Form data-testid="form-container" onSubmit={onSubmit}>
          <Input
            data-testid="name-input"
            {...register('name')}
            error={!!errors.name?.message}
            label="Name"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          {errors.name?.message && (
            <ErrorMessage data-testid="name-error-message">{errors.name?.message}</ErrorMessage>
          )}
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
          {errors.email?.message && (
            <ErrorMessage data-testid="email-error-message">{errors.email?.message}</ErrorMessage>
          )}
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
          {errors.password?.message && (
            <ErrorMessage data-testid="password-error-message">
              {errors.password?.message}
            </ErrorMessage>
          )}

          <SubmitButton
            data-testid="login-button"
            type="submit"
            variant="contained"
            disableElevation
            fullWidth
          >
            {loading ? (
              <div data-testid="loading-container">
                <CircularProgress color="secondary" size={18} />
              </div>
            ) : (
              'Create account'
            )}
          </SubmitButton>
        </Form>
      </SignupCard>
    </Container>
  );
};
