"use client";

import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { DataUser,setUser, initialState } from '@/redux/userSlice';
import { useLocalStorage } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import { LOCALSTORAGE_KEY } from '@/api/dataEnv';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [storedUser, setStoredUser] = useLocalStorage(LOCALSTORAGE_KEY, null);


  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log('Usuario ha cerrado sesión');
    // Redirigir al usuario a la página de inicio de sesión o a otra página
    dispatch(setUser(initialState));
    setStoredUser(null);
    router.push('/login');
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="80vh"
      sx={{ backgroundColor: 'GrayText' }}
    >
      <Typography variant="h6" gutterBottom>
        ¿Seguro que deseas cerrar sesión?
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push('/')}
        sx={{ mt: 2 }}
      >
        Cancelar
      </Button>
    </Box>
  );
};

export default Logout;
