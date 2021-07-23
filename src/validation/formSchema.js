import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(2, 'name must be at least 2 characters')
    // username: yup
    //     .string()
    //     .trim()
    //     .required(' *Username is Required')
    //     .min(6, ' *Username must be at least 6 characters long'),
    // email: yup
    //     .string()
    //     .email('Must be a valid email address')
    //     .required(' *Email is Required'),
    // password: yup
    //     .string()
    //     .trim()
    //     .min(8, ' *Password must be at least 8 characters long')
    //     .required(' *Password is Required'),
    // birthday: yup
    //     .date()
    //     .required(' *Birthday is Required')
    //     .min('1900-01-01',' *Please enter a valid birthday')
    //     .max('2021-06-01',' *Please enter a valid birthday'),
    // userRole: yup
    //     .string()
    //     .oneOf(['warlock','paladin','ranger','bard','wizard'],' *User Role is Required'),
    // tos: yup
    //     .boolean()
    //     .required(' *Terms of Service must be accepted to Submit'),
    // profilePic: yup
    //     .string()
})

export default formSchema