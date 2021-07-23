import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('name is required')
        .min(2, 'name must be at least 2 characters'),
    size: yup
        .string()
        .oneOf(['small','medium','large','extraLarge'], 'Pizza Size is Required'),
    pepperoniTopping: yup.boolean(),
    donutsTopping: yup.boolean(),
    veggiesTopping: yup.boolean(),
    extraCheeseTopping: yup.boolean(),
    special: yup.string(),
})

export default formSchema