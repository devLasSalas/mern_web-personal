import * as Yup from 'yup'

export function initialValues() {
    return {
        email: ''
    }
}

export function validationSchema() {
    return Yup.object().shape({
        email: Yup.string()
           .email('Invalid email')
           .required(true),
    })
}