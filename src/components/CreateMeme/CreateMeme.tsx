"use client";
import React, { useState, FC } from "react";
import {
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Button,
} from "@mui/material";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
//import Image from "next/image";
import { createMeme } from "@/api/rorUserApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Alert } from '@mui/material';

const listFonts = [
  "Arial",
  "Impact",
  "Verdana",
  "Comic Sans MS",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Brush Script MT",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Lucida Grande",
  "Lucida Sans",
];
const listColors = [
  "white",
  "black",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "cyan",
  "magenta",
];
const listSizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const listStyles = ["normal", "italic", "oblique"];

interface IMyFormControl {
  setSelectControl: ({}: any) => void;
  selectControl: any;
  dataMeme: any;
  handleStyleChange: (e: any, field: any) => void;
  icon: any;
  dataSelect: any;
  propSelectControl: any;
}

const MyFormControl: FC<IMyFormControl> = ({
  setSelectControl,
  selectControl,
  dataMeme,
  handleStyleChange,
  icon,
  dataSelect,
  propSelectControl,
}) => {
  return (
    <FormControl>
      <IconButton
        style={{
          width: "40px",
          height: "40px",
        }}
        component="label"
      >
        <div
          onClick={() =>
            setSelectControl({
              ...selectControl,
              [propSelectControl]: true,
            })
          }
        >
          {icon}
        </div>

        <Select
          open={selectControl[propSelectControl]}
          onClose={() =>
            setSelectControl({
              ...selectControl,
              [propSelectControl]: false,
            })
          }
          value={dataMeme[propSelectControl]}
          onChange={(e) => {
            handleStyleChange(e, propSelectControl);
            setSelectControl({
              ...selectControl,
              [propSelectControl]: false,
            });
          }}
          style={{
            position: "relative",
            zIndex: 1000,
            visibility: "hidden",
            width: "0%",
            height: "0%",
          }}
        >
          {dataSelect.map((el: any) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </IconButton>
    </FormControl>
  );
};

const listTopControls = [
  {
    icon: <FontDownloadIcon />,
    dataSelect: listFonts,
    propSelectControl: "fontFamilyTopText",
  },
  {
    icon: <FormatSizeIcon />,
    dataSelect: listSizes,
    propSelectControl: "fontSizeTopText",
  },
  {
    icon: <FormatColorTextIcon />,
    dataSelect: listColors,
    propSelectControl: "fontColorTopText",
  },
  {
    icon: <FormatItalicIcon />,
    dataSelect: listStyles,
    propSelectControl: "fontStyleTopText",
  },
];

const listBottomControls = [
  {
    icon: <FontDownloadIcon />,
    dataSelect: listFonts,
    propSelectControl: "fontFamilyBottomText",
  },
  {
    icon: <FormatSizeIcon />,
    dataSelect: listSizes,
    propSelectControl: "fontSizeBottomText",
  },
  {
    icon: <FormatColorTextIcon />,
    dataSelect: listColors,
    propSelectControl: "fontColorBottomText",
  },
  {
    icon: <FormatItalicIcon />,
    dataSelect: listStyles,
    propSelectControl: "fontStyleBottomText",
  },
];

const CreateMeme = () => {
  const [dataMeme, setDataMeme] = useState<any>({
    topText: "Top Text",
    bottomText: "Bottom Text",
    image: null,
    fontColorTopText: "black",
    fontSizeTopText: 30,
    fontFamilyTopText: "Arial",
    fontStyleTopText: "normal",
    fontColorBottomText: "black",
    fontSizeBottomText: 30,
    fontFamilyBottomText: "Arial",
    fontStyleBottomText: "normal",
  });
  const [selectControl, setSelectControl] = useState<any>({
    fontFamilyTopText: false,
    fontSizeTopText: false,
    fontColorTopText: false,
    fontStyleTopText: false,
    fontFamilyBottomText: false,
    fontSizeBottomText: false,
    fontColorBottomText: false,
    fontStyleBottomText: false,
  });
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const [error, setError] = useState<any>('');

  const handleImageUpload = (e: any) => {
    setDataMeme({
      ...dataMeme,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleTextChange = (e: any, position: any) => {
    setDataMeme({
      ...dataMeme,
      [position]: e.target.innerText,
    });
  };

  const handleStyleChange = (e: any, field: any) => {
    setDataMeme({
      ...dataMeme,
      [field]: e.target.value,
    });
  };

  const handleDownloadMeme = () => {
    console.log("handleDownloadMeme...");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image: any = new Image();
    image.src = dataMeme.image || "";

    
    image.onload = async() => {
    //determinar el tamaño del canvas en base a la imagen para que no se deformen las imagenes
      //tomando en cuenta que la altura sera fijada a 512px
      console.log('image.width: ',image.width);
      console.log('image.height: ',image.height);
      const ancho= Math.floor((image.width * 512) / image.height);
      const alto= 512;
      console.log('ancho: ',ancho);
      console.log('alto: ',alto);
        
      canvas.width = ancho;
      canvas.height = alto;
      context?.drawImage(image, 0, 0, ancho, alto);

      //console.log('dataMeme: ',dataMeme);

      //console.log('dataMeme.fontSizeTopText: ',dataMeme.fontSizeTopText);
      context!.font = `${dataMeme.fontStyleTopText} ${dataMeme.fontSizeTopText}px ${dataMeme.fontFamilyTopText}`;
      context!.fillStyle = dataMeme.fontColorTopText;
      context!.textAlign = "center";
      context?.fillText(dataMeme.topText, canvas.width / 2, 50);

      //console.log('dataMeme.fontSizeBottomText: ',dataMeme.fontSizeBottomText);
      context!.font = `${dataMeme.fontStyleBottomText} ${dataMeme.fontSizeBottomText}px ${dataMeme.fontFamilyBottomText}`;
      context!.fillStyle = dataMeme.fontColorBottomText;
      context?.fillText(
        dataMeme.bottomText,
        canvas.width / 2,
        canvas.height - 50
      );

      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      // Convertir el canvas a un Blob
    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.error("Blob conversion failed.");
        return;
      }

      const file = new File([blob], "meme.png", { type: "image/png" });

      // Crear FormData y añadir el archivo y otros datos
      const dataMemeAPI = new FormData();
      dataMemeAPI.append("topText", dataMeme.topText);
      dataMemeAPI.append("bottomText", dataMeme.bottomText);
      dataMemeAPI.append("file", file);

      try {
        const result = await createMeme(dataMemeAPI, user.access_token);
        console.log("resultCreateMemeAPI: ", result);
        const {_id} = result;
        if(_id){
          console.log('Meme creado con exito!!!');
          router.push('/');
        }else{
          console.log('Error al crear el meme!!!');
          setError('Error al crear el meme!!!, probablemente la sesion ha expirado, por favor inicia sesion nuevamente');
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }, "image/png");
    };

  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
        padding: "20px",
        marginBottom: "100px",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <h1>Crea tu Meme!!!</h1>
      <Button variant="contained">
        <label
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
          htmlFor="userImage"
        >
          Subir Imagen
        </label>
      </Button>
      <input
        style={{ display: "none" }}
        id="userImage"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {dataMeme.image && (
        <>
          <div
            className="TOPCONTROLS"
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            {listTopControls.map((control) => (
              <MyFormControl
                key={Math.random() + new Date().getTime()}
                setSelectControl={setSelectControl}
                selectControl={selectControl}
                dataMeme={dataMeme}
                handleStyleChange={handleStyleChange}
                icon={control.icon}
                dataSelect={control.dataSelect}
                propSelectControl={control.propSelectControl}
              />
            ))}
            {/* <FormControl>
              <IconButton
                component="label"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <FontDownloadIcon
                  onClick={() => {
                    console.log("click font family top text");
                    setSelectControl({
                      ...selectControl,
                      fontFamilyTopText: true,
                    });
                  }}
                />
                <Select
                  open={selectControl.fontFamilyTopText}
                  onClose={() =>
                    setSelectControl({
                      ...selectControl,
                      fontFamilyTopText: false,
                    })
                  }
                  value={dataMeme.fontFamilyTopText}
                  onChange={(e) => {
                    handleStyleChange(e, "fontFamilyTopText");
                    setSelectControl({
                      ...selectControl,
                      fontFamilyTopText: false,
                    });
                  }}
                  style={{
                    position: "relative",
                    zIndex: 1000,
                    visibility: "hidden",
                    width: "0%",
                    height: "0%",
                  }}
                >
                  {listFonts.map((font) => (
                    <MenuItem key={font} value={font}>
                      {font}
                    </MenuItem>
                  ))}
                </Select>
              </IconButton>
            </FormControl>

            <FormControl>
              <IconButton
                style={{
                  width: "40px",
                  height: "40px",
                }}
                component="label"
              >
                <FormatSizeIcon
                  onClick={() =>
                    setSelectControl({
                      ...selectControl,
                      fontSizeTopText: true,
                    })
                  }
                />
                <Select
                  open={selectControl.fontSizeTopText}
                  onClose={() =>
                    setSelectControl({
                      ...selectControl,
                      fontSizeTopText: false,
                    })
                  }
                  value={dataMeme.fontSizeTopText}
                  onChange={(e) => {
                    handleStyleChange(e, "fontSizeTopText");
                    setSelectControl({
                      ...selectControl,
                      fontSizeTopText: false,
                    });
                  }}
                  style={{
                    position: "relative",
                    zIndex: 1000,
                    visibility: "hidden",
                    width: "0%",
                    height: "0%",
                  }}
                >
                  {listSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </IconButton>
            </FormControl>

            <FormControl>
              <IconButton
                style={{
                  width: "40px",
                  height: "40px",
                }}
                component="label"
              >
                <FormatColorTextIcon
                  onClick={() =>
                    setSelectControl({
                      ...selectControl,
                      fontColorTopText: true,
                    })
                  }
                />
                <Select
                  open={selectControl.fontColorTopText}
                  onClose={() =>
                    setSelectControl({
                      ...selectControl,
                      fontColorTopText: false,
                    })
                  }
                  value={dataMeme.fontColorTopText}
                  onChange={(e) => {
                    handleStyleChange(e, "fontColorTopText");
                    setSelectControl({
                      ...selectControl,
                      fontColorTopText: false,
                    });
                  }}
                  style={{
                    position: "relative",
                    zIndex: 1000,
                    visibility: "hidden",
                    width: "0%",
                    height: "0%",
                  }}
                >
                  {listColors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </IconButton>
            </FormControl>

            <FormControl>
              <IconButton
                style={{
                  width: "40px",
                  height: "40px",
                }}
                component="label"
              >
                <FormatItalicIcon
                  onClick={() =>
                    setSelectControl({
                      ...selectControl,
                      fontStyleTopText: true,
                    })
                  }
                />
                <Select
                  open={selectControl.fontStyleTopText}
                  onClose={() =>
                    setSelectControl({
                      ...selectControl,
                      fontStyleTopText: false,
                    })
                  }
                  value={dataMeme.fontStyleTopText}
                  onChange={(e) => {
                    handleStyleChange(e, "fontStyleTopText");
                    setSelectControl({
                      ...selectControl,
                      fontStyleTopText: false,
                    });
                  }}
                  style={{
                    position: "relative",
                    zIndex: 1000,
                    visibility: "hidden",
                    width: "0%",
                    height: "0%",
                  }}
                >
                  {listStyles.map((style) => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </IconButton>
            </FormControl> */}
          </div>
          <div
            className="IMAGE"
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={dataMeme.image}
              alt="Meme"
              style={{ width: "100%", height: "auto" }}
            />
            {/* <Image
              src={dataMeme.image}
              alt="Meme"
              style={{ width: "100%", height: "auto" }}
              width={300}
              height={300}
            /> */}
            <div
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextChange(e, "topText")}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: `${dataMeme.fontSizeTopText}px`,
                color: dataMeme.fontColorTopText,
                fontFamily: dataMeme.fontFamilyTopText,
                fontStyle: dataMeme.fontStyleTopText,
                textAlign: "center",
                width: "100%",
                cursor: "text",
              }}
            >
              {dataMeme.topText}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextChange(e, "bottomText")}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: `${dataMeme.fontSizeBottomText}px`,
                color: dataMeme.fontColorBottomText,
                fontFamily: dataMeme.fontFamilyBottomText,
                fontStyle: dataMeme.fontStyleBottomText,
                textAlign: "center",
                width: "100%",
                cursor: "text",
              }}
            >
              {dataMeme.bottomText}
            </div>
          </div>
          <div
            className="BOTTOMCONTROLS"
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            {listBottomControls.map((control) => (
              <MyFormControl
                key={Math.random()+new Date().getTime()}
                setSelectControl={setSelectControl}
                selectControl={selectControl}
                dataMeme={dataMeme}
                handleStyleChange={handleStyleChange}
                icon={control.icon}
                dataSelect={control.dataSelect}
                propSelectControl={control.propSelectControl}
              />
            ))}

            {/* <FormControl>
              <IconButton
                style={{
                  width: "40px",
                  height: "40px",
                }}
                component="label"
              >
                <FontDownloadIcon
                  onClick={() =>
                    setSelectControl({
                      ...selectControl,
                      fontFamilyBottomText: true,
                    })
                  }
                />
                <Select
                  open={selectControl.fontFamilyBottomText}
                  onClose={() =>
                    setSelectControl({
                      ...selectControl,
                      fontFamilyBottomText: false,
                    })
                  }
                  value={dataMeme.fontFamilyBottomText}
                  onChange={(e) => {
                    handleStyleChange(e, "fontFamilyBottomText");
                    setSelectControl({
                      ...selectControl,
                      fontFamilyBottomText: false,
                    });
                  }}
                  style={{
                    position: "relative",
                    zIndex: 1000,
                    visibility: "hidden",
                    width: "0%",
                    height: "0%",
                  }}
                >
                  {listFonts.map((font) => (
                    <MenuItem key={font} value={font}>
                      {font}
                    </MenuItem>
                  ))}
                </Select>
              </IconButton>
            </FormControl>

            <FormControl>
              <IconButton
                style={{
                  width: "40px",
                  height: "40px",
                }}
                component="label"
              >
                <FormatSizeIcon
                  onClick={() =>
                    setSelectControl({
                      ...selectControl,
                      fontSizeBottomText: true,
                    })
                  }
                />
                <Select
                  open={selectControl.fontSizeBottomText}
                  onClose={() =>
                    setSelectControl({
                      ...selectControl,
                      fontSizeBottomText: false,
                    })
                  }
                  value={dataMeme.fontSizeBottomText}
                  onChange={(e) => {
                    handleStyleChange(e, "fontSizeBottomText");
                    setSelectControl({
                      ...selectControl,
                      fontSizeBottomText: false,
                    });
                  }}
                  style={{
                    position: "relative",
                    zIndex: 1000,
                    visibility: "hidden",
                    width: "0%",
                    height: "0%",
                  }}
                >
                  {listSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </IconButton>
            </FormControl>

            <FormControl>
              <IconButton
                style={{
                  width: "40px",
                  height: "40px",
                }}
                component="label"
              >
                <FormatColorTextIcon
                  onClick={() =>
                    setSelectControl({
                      ...selectControl,
                      fontColorBottomText: true,
                    })
                  }
                />
                <Select
                  open={selectControl.fontColorBottomText}
                  onClose={() =>
                    setSelectControl({
                      ...selectControl,
                      fontColorBottomText: false,
                    })
                  }
                  value={dataMeme.fontColorBottomText}
                  onChange={(e) => {
                    handleStyleChange(e, "fontColorBottomText");
                    setSelectControl({
                      ...selectControl,
                      fontColorBottomText: false,
                    });
                  }}
                  style={{
                    position: "relative",
                    zIndex: 1000,
                    visibility: "hidden",
                    width: "0%",
                    height: "0%",
                  }}
                >
                  {listColors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </IconButton>
            </FormControl>

            <FormControl>
              <IconButton
                style={{
                  width: "40px",
                  height: "40px",
                }}
                component="label"
              >
                <FormatItalicIcon
                  onClick={() =>
                    setSelectControl({
                      ...selectControl,
                      fontStyleBottomText: !selectControl.fontStyleBottomText,
                    })
                  }
                />
                <Select
                  open={selectControl.fontStyleBottomText}
                  onClose={() =>
                    setSelectControl({
                      ...selectControl,
                      fontStyleBottomText: false,
                    })
                  }
                  value={dataMeme.fontStyleBottomText}
                  onChange={(e) => {
                    handleStyleChange(e, "fontStyleBottomText");
                    setSelectControl({
                      ...selectControl,
                      fontStyleBottomText: false,
                    });
                  }}
                  style={{
                    position: "relative",
                    zIndex: 1000,
                    visibility: "hidden",
                    width: "0%",
                    height: "0%",
                  }}
                >
                  {listStyles.map((style) => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </IconButton>
            </FormControl> */}
          </div>
          <Button
            className="DOWNLOAD"
            variant="contained"
            style={{
              marginTop: "20px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={handleDownloadMeme}
          >
            Descargar Meme
          </Button>
        </>
      )}
      {error !== '' && (
        <Alert 
        onClose={() => setError('')}
        severity="error">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default CreateMeme;
