import React, { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardResena from "./CardResena";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {getResenas} from '@/api/rorUserApi';
import { MYSITERESENA } from "@/api/dataEnv";
import { dataAvatares } from "@/api/dataEnv";

const tempDataResenas = [
  {
    id: 1,
    name: "Juan Perez",
    avatarUrl: "/avatar1.png",
    resena: "Excelente servicio, muy recomendado",
    stars: 5,
  },
  {
    id: 2,
    name: "Maria Lopez",
    avatarUrl: "/avatar2.png",
    resena: "Muy buen servicio, lo recomiendo",
    stars: 4,
  },
  {
    id: 3,
    name: "Pedro Ramirez",
    avatarUrl: "/avatar3.png",
    resena: "Muy mal servicio, no lo recomiendo",
    stars: 1,
  },
];

const Resenas = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resenas, setResenas] = useState([]);
  const user = useSelector((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    

    fetchResenas();
  }, []);

  const fetchResenas = async () => {
    try {
      const result = await getResenas();
      //console.log(result);
      if(result.length>0){
        const myResenas = result.filter((resena:any) => resena.siteResena ===MYSITERESENA );
        console.log('myResenas: ',myResenas);
        const myTempResenas = myResenas.map((resena:any) => {
          return {
            id: resena._id,
            name: resena.idUsuario.username,
            avatarUrl: dataAvatares.find((avatar:any) => avatar.title === resena.idUsuario.avatar)?.url,
            resena: resena.resena,
            stars: resena.calificacion,
          };
        });
        setResenas(myTempResenas);
      }
      //setResenas(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrev = () => {
    //console.log('Prev Index:', prevIndex, 'New Index:', newIndex);
    setCurrentIndex((prevIndex) =>{
      const newIndex = prevIndex === 0 ? resenas.length - 1 : prevIndex - 1;
    //console.log('Prev Index:', prevIndex, 'New Index:', newIndex);
    return newIndex;
    }
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === resenas.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginTop: "10px",
        backgroundColor: "rgba(0,0,0,0.1)",
        padding: "0px",
      }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "black",
          zIndex: 100,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {user?.email ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/create-resena")}
            sx={{ position: "relative", top: 0 }}
          >
            Crear Reseña
          </Button>
        )
        : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/register")}
            sx={{ position: "relative", top: 0 }}
          >
            Registrate para crear una reseña
          </Button>
        )
      }
      {
        resenas.length === 0 && (
          <h3>No hay reseñas</h3>
        )
      }

          {resenas.length > 0 && (
            <CardResena dataResena={resenas[currentIndex]} />
            )}
        
      </div>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "black",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Resenas;
