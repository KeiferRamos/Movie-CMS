import * as yup from 'yup';

export const ValidationSchema = yup.object().shape({
  bio: yup.string().required('this field is required!'),
  username: yup.string().required('this field is required!'),
  email: yup.string().required('this field is required!'),
  role: yup.string().required('this field is required!'),
  contactNumber: yup.string().required('this field is required!'),
  fullName: yup.object().shape({
    firstName: yup.string().required('this field is required!'),
    middleName: yup.string().required('this field is required!'),
    lastName: yup.string().required('this field is required!'),
  }),
  address: yup.object().shape({
    City: yup.string().required('this field is required!'),
    Province: yup.string().required('this field is required!'),
    Barangay: yup.string().required('this field is required!'),
    blockNumber: yup.string().required('this field is required!'),
    Street: yup.string().required('this field is required!'),
  }),
  image: yup.object().shape({
    name: yup.string().required('this field is required!'),
    data: yup.string().required('this field is required!'),
  }),
});

export const initialValues = {
  _id: '',
  bio: '',
  username: '',
  email: '',
  contactNumber: '',
  role: '',
  fullName: {
    firstName: '',
    middleName: '',
    lastName: '',
  },
  address: {
    City: '',
    Province: '',
    Barangay: '',
    blockNumber: '',
    Street: '',
  },
  image: {
    name: '',
    data: '',
  },
};
