import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Typography, Box } from "@mui/material";
import Image from "next/image";
import { servicesDescription } from "@/data/dataUserLinks";


const dataServicios = [
  ...servicesDescription
];

function Servicios() {
  return (
    <div style={{ marginTop: "20px", height:'60vh', overflow:'auto', paddingBottom:'30px' }}>
      <Box
        sx={{
          marginTop: "20px",
          textAlign: "center",
          bgcolor: "warning.main",
          border: "1px solid",
          borderColor: "info.main",
          color: "warning.contrastText",
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6">
          Te ofrecemos los siguientes servicios:
        </Typography>
      </Box>
      <div
        style={{
          width: "75vw",
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {dataServicios.map((servicio, index) => (
          <Accordion key={servicio.title}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <span style={{ fontWeight: "bolder" }}>{servicio.title}</span>
            </AccordionSummary>
            <AccordionDetails style={{position:'relative'}}>
            {servicio.imageUrl && (
                  <Image
                  
                    src={servicio.imageUrl}
                    alt={servicio.title}
                    width={300}
                    height={300}
                    style={{
                      position:'relative', 
                      margin:'10px',
                      borderRadius:'10px',
                      boxShadow:'0 0 10px rgba(0,0,0,0.5)',
                      float:index%2===0?'right':'left', 
                      maxWidth:'50%',
                      height:'auto',
                      
                    }}
                  />
                )}
                <p style={{textAlign:'justify',position:'relative'}}>{servicio.text}</p>
                
              
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
