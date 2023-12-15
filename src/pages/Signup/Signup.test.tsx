import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Signup } from './Signup.component';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockedUserName = 'John Doe';
const mockedUserEmail = 'johndow@yopmail.com';
const mockedPassword = '12345678';

function doAsync(cb: () => void) {
  setTimeout(cb, 100);
}

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

    userEvent.click(submitButton);

    doAsync(() => {
      const nameErrorMessage = screen.getByTestId('name-error-message');
      const emailErrorMessage = screen.getByTestId('email-error-message');
      const passwordErrorMessage = screen.getByTestId('password-error-message');

      expect(nameErrorMessage).toBeInTheDocument();
      expect(emailErrorMessage).toBeInTheDocument();
      expect(passwordErrorMessage).toBeInTheDocument();
    });
  });

  it('Should not display errors when submit with data', async () => {
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(nameInput, mockedUserName);
    userEvent.type(emailInput, mockedUserEmail);
    userEvent.type(passwordInput, mockedPassword);

    const submitButton = screen.getByTestId('login-button');

    userEvent.click(submitButton);

    const nameErrorMessage = screen.queryByTestId('name-error-message');
    const emailErrorMessage = screen.queryByTestId('email-error-message');
    const passwordErrorMessage = screen.queryByTestId('password-error-message');

    expect(nameErrorMessage).not.toBeInTheDocument();
    expect(emailErrorMessage).not.toBeInTheDocument();
    expect(passwordErrorMessage).not.toBeInTheDocument();
  });

  it('Should show loading when submit with data', async () => {
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(nameInput, mockedUserName);
    userEvent.type(emailInput, mockedUserEmail);
    userEvent.type(passwordInput, mockedPassword);

    const submitButton = screen.getByTestId('login-button');
    userEvent.click(submitButton);

    doAsync(() => {
      const loading = screen.getByTestId('loading-container');

      expect(loading).toBeInTheDocument();
    });
  });
});
