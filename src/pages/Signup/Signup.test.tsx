import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Signup } from './Signup.component';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

describe('Signup page tests', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Signup />
        <ToastContainer />
      </BrowserRouter>,
    );
  });

  it('Should has name, email and password inputs and submit button', () => {
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-button');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Should display errors when submit without informations', async () => {
    const submitButton = screen.getByTestId('login-button');

    await act(async () => {
      await userEvent.click(submitButton);
    });

    const nameErrorMessage = screen.getByTestId('name-error-message');
    const emailErrorMessage = screen.getByTestId('email-error-message');
    const passwordErrorMessage = screen.getByTestId('password-error-message');

    expect(nameErrorMessage).toBeInTheDocument();
    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });
});
