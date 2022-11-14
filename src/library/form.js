import * as yup from 'yup'

export const loginValidationSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email.')
        .required('Please enter your email.'),
    password: yup.string().required('Please enter your password.'),
})

export const registerValidationSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email.')
        .required('Please enter your email.'),
    password: yup
        .string()
        .min(8, 'Must be more than 8 characters long')
        .required('Please enter your password.'),
    confirmPassword: yup
        .string()
        .min(8, 'Must be more than 8 characters long')
        .required('Please enter your password.'),
})
