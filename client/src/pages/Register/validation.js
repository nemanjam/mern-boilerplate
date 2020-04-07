import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Must be 2 characters at minimum')
    .max(30, 'Must be 30 characters or less')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Must be 2 characters at minimum')
    .max(20, 'Must be 20 characters or less')
    .matches(/^[a-zA-Z0-9_]+$/, 'Invalid characters in username')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters at minimum')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});
