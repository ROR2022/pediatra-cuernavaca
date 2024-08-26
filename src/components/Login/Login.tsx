"use client";
import React, {useState,useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { loginUser } from '@/api/rorUserApi';
import { useRouter } from 'next/navigation';
//importaremos el icono de close de material ui
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from "react-redux";
import { DataUser, setUser } from "@/redux/userSlice";
import { useLocalStorage } from "usehooks-ts";
//import { loginUser } from "@/api/rorUserApi";
import { LOCALSTORAGE_KEY } from "@/api/dataEnv";
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const [responseLogin, setResponseLogin] = useState<any>(null);
    const user = useSelector((state: { user: DataUser }) => state.user);
    const [loading, setLoading] = useState(false);
    const [storedUser, setStoredUser] = useLocalStorage<DataUser>(
      LOCALSTORAGE_KEY,
      user
    );
    const dispatch = useDispatch();
    const router = useRouter();



  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es obligatorio'),
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      console.log('Datos del formulario:', values);
      
      try {
        setLoading(true);
        const response = await loginUser(values);
        console.log('Respuesta del login:', response);
        setResponseLogin(response);
        //router.push('/');
        setTimeout(() => {
            setResponseLogin(null);
            if (response?.email) {
                router.push('/');
                dispatch(setUser(response));
                setStoredUser(response);
                
            }
            }, 2000);
            setLoading(false);
      } catch (error) {
        console.error('Error en el login:', error);
        setResponseLogin({ error, message: 'Error en el login' });
        setLoading(false);
      }
      
    },
  });
  

  return (
    <Container 
        sx={{ mt: 4 }}
    maxWidth="xs" >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Iniciar Sesión
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Correo electrónico"
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
        <Button 
          color="primary" 
          variant="contained" 
          fullWidth 
          type="submit" 
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
          
        </Button>
      </form>
        {responseLogin?.error && (
            <Box display="flex">
            <Typography 
                sx={{ mt: 2 }}
                variant="body1" 
                align="center" 
                color={responseLogin.error ? 'error' : 'success'}
            >
            {`${responseLogin.error} ${responseLogin.message}` || 'Error en el login'}
            </Typography>
            <Button 
                onClick={() => setResponseLogin(null)}
                variant={'text'}
                sx={{ mt: 2, color: 'GrayText' }}
                startIcon={<CloseIcon />}
            />
                
            
            </Box>
        )}
        {responseLogin?.email && (
            <Box display="flex">
            <Typography 
                sx={{ mt: 2, color: 'darkgreen', fontWeight: 'bold' }}
                variant="body1" 
                align="center" 
                color={'success'}
            >
            {`Bienvenido ${responseLogin.email}`}
            </Typography>
            <Button 
                onClick={() => setResponseLogin(null)}
                variant={'text'}
                sx={{ mt: 2, color: 'GrayText' }}
                startIcon={<CloseIcon />}
            />
            </Box>
            )}
        <Link href="/register">
            <Button 
                variant="text" 
                sx={{ mt: 2 }}
                fullWidth
            >
            No tienes cuenta? Regístrate aqui
            </Button>
        </Link>
    </Container>
  );
};

export default Login;
