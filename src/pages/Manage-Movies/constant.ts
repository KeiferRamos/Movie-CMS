import * as yup from 'yup';

export const ValidationSchema = yup.object().shape({
  title: yup.string().required('this field is required!'),
  year: yup.string().required('this field is required!'),
  plot: yup.string().required('this field is required!'),
});

export const castInitialValue = {
  image: '',
  asCharacter: '',
  name: '',
};

export const initialValues = {
  title: '',
  image: '',
  mobileImage: '',
  year: '',
  genres: [],
  cast: [],
  trailer: '',
  plot: '',
  similar: [],
  rank: 0,
  featured: false,
};
