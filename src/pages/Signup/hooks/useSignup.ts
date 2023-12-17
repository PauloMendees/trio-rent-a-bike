import { useForm } from 'react-hook-form';
import { SignupScheme, SignupFormType } from '../scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import apiClient from 'services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userDataKey } from 'config/localStorage';
import { AxiosError } from 'axios';
import { User } from 'models/User';

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm<SignupFormType>({
    resolver: zodResolver(SignupScheme),
  });

  const errors = useMemo(() => formState.errors, [formState]);

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (data) => {
        try {
          setLoading(true);
          const response = await apiClient.post<User>('/users', data);
          window.localStorage.setItem(userDataKey, JSON.stringify(response.data));
          navigate('/');
        } catch (error) {
          if (error instanceof AxiosError) {
            return toast.error(error.response?.data?.message || error.message);
          }
          return toast.error('Error registering user');
        } finally {
          setLoading(false);
        }
      }),
    [handleSubmit],
  );

  return { loading, errors, register, onSubmit };
};
