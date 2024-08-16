

import React from 'react'
import Image from 'next/image'


const dataImages = [
    
    {
        url: "/visitanos.png",
        alt: "imagen 2"
    },
    {
        url: "/logoPediatra.png",
        alt: "imagen 1"
    },
    {
        url: "/consulta.png",
        alt: "imagen 3"
    },
]

const MainCarrousel = () => {
  return (
    <div 
    style={{
        display:'flex',
        flexWrap:'wrap',
        gap:'20px',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'20px'
    }}
    >
        {
            dataImages.map(item=>{
                return(
                    <Image
                    key={item.alt}
                    src={item.url}
                    alt={item.alt}
                    width={300}
                    height={300}
                    style={{
                        position:'relative', 
                        margin:'10px',
                        borderRadius:'10px',
                        boxShadow:'0 0 10px rgba(0,0,0,0.5)',
                        
                        maxWidth:'300px',
                        height:'auto',
                        width:'auto'
                        
                      }}

                    />
                )
            })
        }
    </div>
  )
}

export default MainCarrousel