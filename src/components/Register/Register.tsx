"use client";
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Avatar, Grid } from '@mui/material';
import { dataAvatares } from '@/api/dataEnv';
import { registerUser } from '@/api/rorUserApi';
import ModalRegister from './ModalRegister';
import Link from 'next/link';


const Register = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string|null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [verificationId, setVerificationId] = useState<string|null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('El nombre de usuario es obligatorio'),
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es obligatorio'),
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es obligatoria')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          , 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial'
        ), 
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('La confirmación de contraseña es obligatoria'),
      avatar: Yup.string()
        .required('Selecciona un avatar'),
    }),
    onSubmit: async (values) => {
      console.log('Datos del formulario:', values);
      const { confirmPassword, ...data } = values;
      try {
        const response = await registerUser(data);
        console.log('Respuesta del servidor:', response);
        const { verification } = response;
        if (verification) {
          console.log('Código de verificación:', verification);
          setVerificationId(verification);
          setOpenModal(true);
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    },
  });

  const handleAvatarClick = (avatar:string) => {
    setSelectedAvatar(avatar);
    formik.setFieldValue('avatar', avatar);
  };

  return (
    <Container 
    style={{ marginBottom: '50px' }}
    maxWidth="sm">
      <ModalRegister 
        open={openModal}
        handleClose={() => setOpenModal(false)}
        verificationId={verificationId||''}
      />
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Registrarse
        </Typography>
        <Typography variant="body2" gutterBottom>
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login">
            <span>Inicia sesión</span>
          </Link>
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Nombre de Usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Correo Electrónico"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            margin="normal"
            variant="outlined"
          />

          <Typography variant="h6" gutterBottom>
            Selecciona un Avatar
          </Typography>
          <Grid container spacing={2}>
            {dataAvatares.map((avatar, index) => (
              <Grid item xs={3} key={index}>
                <Avatar
                  src={avatar.url}
                  alt={`avatar-${index}`}
                  sx={{
                    width: 56,
                    height: 56,
                    cursor: 'pointer',
                    border: selectedAvatar === avatar.title ? '2px solid #3f51b5' : 'none',
                  }}
                  onClick={() => handleAvatarClick(avatar.title)}
                />
              </Grid>
            ))}
          </Grid>
          {formik.touched.avatar && formik.errors.avatar && (
            <Typography color="error" variant="body2">
              {formik.errors.avatar}
            </Typography>
          )}

          <Button 
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit" 
            sx={{ mt: 2 }}
          >
            Registrarse
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
