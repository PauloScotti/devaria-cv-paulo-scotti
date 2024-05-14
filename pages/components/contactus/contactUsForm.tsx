import React from "react";
import { Form, Alert, Button, Row, Col } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import HTMLParser, { domToReact } from "html-react-parser";
import { IFormData } from "../../../typescript/interfaces/contactus.interface";
import FloatingFormGroup from "./floatingFormGroup";
import emailjs from '@emailjs/browser';

interface IContactUsForm {
  className?: string
  formControlClass?: string;
  fullWidth?: boolean;
  hideLabels?: boolean;
  btnFullWidth?: boolean;
  btnType?: 'outline' | 'solid';
}

const ContactUsForm: React.FC<IContactUsForm> = ({ className, formControlClass, btnFullWidth, fullWidth, hideLabels, btnType }) => {
  const [message, setMessage] = React.useState<ReturnType<typeof domToReact> | null>(null);
  // form validation rules 
  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .required('This field is required'),
    email: Yup.string()
      .required('This field is required')
      .email('Email is invalid'),
    company: Yup.string()
      .required('This field is required'),
    message: Yup.string()
      .required('This field is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState, getValues } = useForm<any>({
    ...formOptions,
    mode: 'all'
  });
  const errors = formState.errors as any;
  const onSubmit = async (data: IFormData, e: React.BaseSyntheticEvent<any> | undefined) => {
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_KEY_EMAILJS as string,
    })
    const templateParams = {
      to_name: "Paulo Scotti",
      from_name: data.fullname,
      company: data.company,
      email: data.email,
      message: data.message
    }
    await emailjs.send(process.env.NEXT_PUBLIC_SERVICE_ID_EMAILJS as string, process.env.NEXT_PUBLIC_TEMPLATE_ID_EMAILJS as string, templateParams).then(
      (response) => {
        setMessage(HTMLParser(response.text));
        reset();
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      },
      (error) => {
        console.log('Erro ao enviar o email: ', error);
      },
    );
  }
  return (
    <>

      {
        message && <Alert variant="success">
          {message}
        </Alert>
      }
      <Form onSubmit={handleSubmit(onSubmit)} className={className}>
        <Row>
          <Col lg={fullWidth ? 12 : 6}>
            <FloatingFormGroup errors={errors?.fullname} label="Nome" register={register} field="fullname" id={"fullname"} type="text" name="fullname" inputClass={formControlClass} hideLabels={hideLabels} placeholder="Nome completo" />
          </Col>
          <Col lg={fullWidth ? 12 : 6}>
            <FloatingFormGroup errors={errors?.company} label="Empresa" register={register} field="company" id={"company"} type="text" name="company" inputClass={formControlClass} hideLabels={hideLabels} placeholder="Nome da empresa" />
          </Col>
          <Col lg={12}>
            <FloatingFormGroup errors={errors?.email} label="E-mail" register={register} field="email" id={"email"} type="text" name="email" inputClass={formControlClass} hideLabels={hideLabels} placeholder="Seu endereço de E-mail" />
          </Col>
          <Col lg={12}>
            <FloatingFormGroup errors={errors?.message} label="Mensagem" register={register} field="message" id={"message"} type="text" name="message" inputClass={formControlClass} hideLabels={hideLabels} placeholder="Deixe o motivo do contato" fieldTextArea />
          </Col>
        </Row>
        <div className={`${btnFullWidth ? 'd-grid' : 'form-group'} pt-30 text-center`}>
          <Button variant={btnType === 'outline' ? "outline-primary" : 'primary'} type="submit">Enviar</Button>
        </div>
      </Form>
    </>
  )
}
ContactUsForm.displayName = "Contact Us Form";
export default ContactUsForm