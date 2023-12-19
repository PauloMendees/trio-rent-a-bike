import { z } from 'zod';

export const SignupScheme = z.object({
  email: z.string().email(),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export type SignupFormType = z.infer<typeof SignupScheme>;
