import * as Yup from 'yup'
export const roleSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('Field is required'),
    last_name: Yup.string()
    .required('Field is required'),
    email: Yup.string()
    .required('Field is required'),

})


