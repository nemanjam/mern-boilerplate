import * as Yup from 'yup';

export const profileSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Must be 2 characters at minimum')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Must be 2 characters at minimum')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters at minimum')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
});
