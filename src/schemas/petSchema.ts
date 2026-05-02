import * as yup from 'yup';

export const addPetSchema = yup.object().shape({
  sex: yup.string().required('Find sex of your pet'),
  imgURL: yup
    .string()
    .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, 'Invalid image URL format')
    .required('Pet photo URL is required'),
  title: yup.string().required('Title is required'),
  name: yup.string().required('Name is required'),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD')
    .required('Birthday is required'),
  species: yup.string().required('Find species of your pet'),
});

export type AddPetFormValues = yup.InferType<typeof addPetSchema>;
