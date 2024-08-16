"use client";
import React, { useState, FC,useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { phoneUser } from "@/data/dataUserLinks";

const Contacto: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    if (errorForm) {
      setTimeout(() => {
        setErrorForm("");
      }, 2000);
    }
  }, [errorForm]);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setErrorForm("Todos los campos son requeridos");
      return;
    }
    setErrorForm("");
    const phoneNumber = phoneUser; //
    const whatsappMessage = `Hola, soy ${name}. Mi correo es ${email}. ${message}`;

    // Genera la URL de WhatsApp con el mensaje predefinido
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Redirige a la URL de WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: "secondary.dark",
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Contactanos
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensaje"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Enviar
              </Button>
              {errorForm && (
                <Typography 
                sx={{mt:2, textAlign:'center'}}
                variant="body2" color="error">
                  {errorForm}
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Contacto;
