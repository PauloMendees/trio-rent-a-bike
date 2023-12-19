import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormType, LoginScheme } from './scheme';
import { useMemo } from 'react';

export const useLogin = () => {
  const { register, formState, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(LoginScheme),
  });

  const errors = useMemo(() => formState.errors, [formState]);

  const onSubmit = useMemo(() => handleSubmit((data) => console.log(data)), [handleSubmit]);

  return { errors, register, handleSubmit, onSubmit };
};
