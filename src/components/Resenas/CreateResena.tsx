"use client";
import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import { createResena } from '@/api/rorUserApi';
import CircularProgress from '@mui/material/CircularProgress';
import {MYSITERESENA} from '@/api/dataEnv';
import { useRouter } from 'next/navigation';


// Esquema de validación con Yup
const validationSchema = Yup.object({
  name: Yup.string(),
  resena: Yup.string().required('La reseña es requerida'),
  stars: Yup.number().required('La calificación es requerida').min(1, 'Al menos 1 estrella').max(5, 'Máximo 5 estrellas'),
});

const CreateResena = () => {
    const user = useSelector((state:any) => state.user);
    const [loading, setLoading] = useState(false);
    const [resultResena, setResultResena] = useState<any>({ success: false, message: '' });
    const router = useRouter();
  const initialValues = {
    name: user?.username,
    resena: '',
    stars: 0,
  };

  const handleSubmit = async(values:any, { resetForm }:any) => {
    values.name=user?.username;
    console.log('Datos del formulario:', values);
    const dataResena = {
        resena: values.resena,
        calificacion: values.stars,
        siteResena: MYSITERESENA,
      };
      setLoading(true);
      try {
        const result = await createResena(dataResena, user.access_token);
        console.log(result);
        const { success, message } = result;
        setResultResena({ success, message });
        setLoading(false);
        if(success){
          setTimeout(() => {
            router.push('/');
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

    resetForm();
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{textAlign:'center'}}>
        Crear Reseña
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <Field
              name="name"
              as={TextField}
              fullWidth
              label="Nombre"
              value={user?.username}
              variant="outlined"
              margin="normal"
              disabled
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <Field
              name="resena"
              as={TextField}
              fullWidth
              label="Reseña"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              error={touched.resena && Boolean(errors.resena)}
              helperText={touched.resena && errors.resena}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Calificación:
              </Typography>
              <Rating
                name="stars"
                value={values.stars}
                onChange={(event, newValue) => setFieldValue('stars', newValue)}
                precision={1}
              />
              {touched.stars && errors.stars && (
                <Typography variant="body2" color="error" sx={{ ml: 2 }}>
                  {errors.stars}
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
                {loading ? <CircularProgress size={24} /> : 'Enviar Reseña'}
              
            </Button>
            {resultResena.message && (
                <Typography
                    variant="body2"
                    color={resultResena.success ? 'primary' : 'error'}
                    sx={{ mt: 2 }}
                >
                    {resultResena.message}
                </Typography>
            )
                }
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateResena;
