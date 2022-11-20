import React,{useState} from 'react'
import { Form } from 'semantic-ui-react';
import { initialValues, validationSchema} from './Newsletter.form';
import { useFormik } from 'formik';
import { Newsletter as NewsletterController } from '../../../../api'
import './Newsletter.scss';

const newsletterController = new NewsletterController();

export function Newsletter() {
    const [success, setSuccess] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await newsletterController.registerEmail(formValue.email)
                formik.resetForm();
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        }
    })
    
  return (
    <div className='footer-newsletter'>
        <h4>¡Apuntarte y aprende!</h4>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
            name='email' 
            placeholder='Correo electronico' 
            onChange={formik.handleChange} 
            value={formik.values.email}
            error={formik.errors.email}
            />
            <Form.Button 
            type='submit' 
            primary 
            fluid 
            loading={formik.isSubmitting}
            >
                ¡Me suscribo!
            </Form.Button>
            {success && (
                <p className='success'>¡Email registrado correctamente!</p>
            )}
        </Form>
    </div>
  )
}
