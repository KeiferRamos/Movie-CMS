import * as yup from 'yup';

export const LoginValidationSchema = yup.object().shape({
  email: yup.string().required('this field is required!'),
  password: yup.string().required('this field is required!'),
});

export const LoginInitialValues = {
  email: '',
  password: '',
};

export type LoginInputType = {
  email: string;
  password: string;
};

export const RegisterValidationSchema = yup.object().shape({
  username: yup.string().required('this field is required'),
  email: yup.string().required('this field is required'),
  password: yup.string().required('this field is required'),
  verify: yup.string().required('this field is required'),
  registrationId: yup.string().required('this field is required'),
  role: yup.string().required('this field is required'),
});

export const RegisterInitialValues = {
  username: '',
  email: '',
  password: '',
  verify: '',
  registrationId: '',
  role: 'developer',
};

export type RegisterInputType = {
  username: string;
  email: string;
  password: string;
  verify: string;
  registrationId: string;
  role: string;
};

export const RoleOptions = [
  { label: 'Administrator', value: 'administrator' },
  { label: 'Manager', value: 'manager' },
  { label: 'Developer', value: 'developer' },
];
