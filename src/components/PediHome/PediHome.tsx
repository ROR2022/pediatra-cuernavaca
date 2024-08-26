"use client"
import React from 'react'
import MainCarrousel from './MainCarrousel'
import Servicios from '../Servicios/Servicios'
import Publicaciones from '../Publicaciones/Publicaciones'
import Contacto from '../Contacto/Contacto'
import Resenas from '../Resenas/Resenas'


const PediHome = () => {
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
      <MainCarrousel/>
      <Resenas/>
      <Servicios/>
      <Publicaciones/>
      <Contacto/>
      </div>
  )
}

export default PediHome