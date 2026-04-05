import * as yup from 'yup';

export const validationSchema = yup.object({
  avatar: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, {
      message: 'Invalid image link format',
      excludeEmptyString: true,
    })
    .default(''),
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format')
    .required('Email is required'),
  phone: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\+38\d{10}$/, {
      message: 'Phone number must be +38XXXXXXXXXX',
      excludeEmptyString: true,
    })
    .default(''),
});

export type UserEditValidationSchema = yup.InferType<typeof validationSchema>;
