"use client"
import React from 'react'
import MainCarrousel from './MainCarrousel'
import Servicios from '../Servicios/Servicios'
import Publicaciones from '../Publicaciones/Publicaciones'
import Contacto from '../Contacto/Contacto'
import Resenas from '../Resenas/Resenas'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import ShowMemes from '../CreateMeme/ShowMemes'
import { Divider } from '@mui/material'
import InstallButton from '../InstallButton/InstallButton'


const PediHome = () => {
  const user = useSelector((state: any) => state.user)

  return (
    <div
    style={{
      minHeight:'80vh',
      overflowY:'auto',
      overflowX:'hidden',
      display:'flex',
      flexDirection:'column',
      gap:'20px',
      marginBottom:'100px'
    }}
    
    >

      <InstallButton/>

      {user && user.email !== "" ? (
        <div style={{marginTop:'20px', display:'flex', justifyContent:'center'}}>
          <Link href="/create-meme">
            <Button 
            variant="contained" color="info">
              Crear meme
            </Button>
          </Link>
          </div>
        ) : (
          <div style={{marginTop:'20px', display:'flex', justifyContent:'center'}}>
          <Link href="/login">
            <Button variant="contained" color="info">
              Iniciar sesión para crear memes
            </Button>
          </Link>
          </div>
        )}
        <ShowMemes/>
        <Divider style={{ marginTop: "20px" }} />
      <MainCarrousel/>
      <Resenas/>
      <Servicios/>
      <Publicaciones/>
      <Contacto/>
      </div>
  )
}

export default PediHome