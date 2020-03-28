import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters at minimum')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});
