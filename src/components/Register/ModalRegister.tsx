import React, { useState, FC } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import {confirmVerificationCode} from '@/api/rorUserApi';
import { setUser } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from 'usehooks-ts';
import { LOCALSTORAGE_KEY } from '@/api/dataEnv';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';

interface ModalRegisterProps {
    open: boolean;
    handleClose: () => void;
    verificationId: string;
    }


const ModalRegister:FC<ModalRegisterProps> = ({ open, handleClose, verificationId }) => {
  const [verificationCode, setVerificationCode] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const [, setLocalStorage] = useLocalStorage(LOCALSTORAGE_KEY, '');
    const [loading, setLoading] = useState(false);

  const handleSubmit = async() => {
    // Lógica para manejar la verificación del código
    console.log('Código de verificación ingresado:', verificationCode);
    // agregar aquí la lógica para validar el código y proceder con el registro
    try {
        setLoading(true);
      const response = await confirmVerificationCode(verificationId,verificationCode);
      console.log('Respuesta del servidor:', response);
      // agregar aquí la lógica para cerrar el modal y redirigir al usuario a otra página
      const { success, dataUser } = response;
      if(success){
        dispatch(setUser(dataUser));
        setLocalStorage(dataUser);
        setTimeout(() => {
            router.push('/');
            setLoading(false);
            handleClose();
        }, 2000);
      }
      
    } catch (error) {
      console.error('Error al verificar el código:', error);
        setLoading(false);
        //handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        maxWidth: '350px',
      }}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: '50vh',
          left: '50vw',
          transform: 'translate(-50%, -50%)',
          maxWidth: '350px',
          width: '70vw',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Verificación de Código
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Ingresa el código que fue enviado a tu correo electrónico para completar el registro.
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="verificationCode"
          label="Código de Verificación"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          variant="outlined"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          fullWidth
          disabled={loading}
        >
            {loading ? <CircularProgress size={24} /> : 'Verificar'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalRegister;
