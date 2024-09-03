"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getMemes } from "@/api/rorUserApi";
import CircularProgress from '@mui/material/CircularProgress';
/**
 * 
 *  <div
         key={index}
         dangerouslySetInnerHTML={{ __html: meme }}
         style={{ overflow:'auto'}}
       />
 */

const ShowMemes = () => {
  const [memes, setMemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getMemes().then((res) => {
      console.log("res getMemes:  ", res);
      const tempMemes = res.map((meme: any) => meme.memeURL);
      setMemes(tempMemes);
      setLoading(false);
    });
  }, []);

  return (
    <div
        style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            
            marginTop: "5vh",
            marginBottom: "3vh",
        }}
    >
      {loading && <CircularProgress />}
      {memes.map((meme, index) => (
         <Image
            onClick={() => window.open(meme, "_blank")}
            key={`${meme}`}
            src={meme}
            alt="meme"
            width={300}
            height={300}
            style={{ 
              margin: "10px",
              objectFit: "contain", 
            }}
          />
      ))}
    </div>
  );
};

export default ShowMemes;
