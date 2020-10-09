import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { useEffect, useState } from "react";
import axios from "axios";
import { getHeaderToken, getToken, getUserID } from "../Login/JwtConfig";
import { getUserPlatformAPIPort} from "../Login/JwtConfig";
import { SentimentSatisfied } from '@material-ui/icons';

export default function MyDropzone() {
    const [file, setFile] = useState([]);

    //event media state variables
    const [mediaName, setMediaName] = useState("");
    const [mediaSize, setMediaSize] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [mediaModifiedDate, setMediaModifiedDate] = useState("");
    //change
    const handleMediaUpload = (event) => {
    
        const body = {
          EventCoverImage: {
            // required
            FileId: mediaName,
            FileName: mediaName,
            FileContent: mediaType,
            FileSize: mediaSize,
            EventId: 82,
            //not required (null)
            ChannelId: 0,
            Channel: null,
            //required
            UploaderId: 0,
            DateUploaded: "",
          },
          EventVideoTrailer: null,
        };
      
        console.log(body);

        console.log(getHeaderToken());
        const res = axios
          .put(
            `{${getUserPlatformAPIPort()}}api/EventController/AssignFilesToEvent`,
            body
          )
          .then(
            (res) => {
              console.log(res);
              if (res.status === 200) alert("update Event Success");
            },
            (error) => {
              alert("something went wrong,  please try again", error);
            }
          );
      };

        
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      

      const reader = new FileReader()
     
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {

      // Do whatever you want with the file contents
      console.log(file.name);
      setMediaName(file.name);

      console.log(file.type);
      setMediaType(file.type);

      console.log(file.lastModifiedDate);
      setMediaModifiedDate(file.lastModifiedDate);

        const binaryStr = reader.result

        console.log(file.size);

        setMediaSize(binaryStr.Int8Array);
        console.log(binaryStr)
    

      const body = {
        EventCoverImage: {
          // required
          FileId: file.name,
          FileName: file.name,
          FileContent:binaryStr,
          FileSize: file.size,
          EventId: 82,
          //not required (null)
          ChannelId: 0,
          Channel: null,
          //required
          UploaderId: 0,
          DateUploaded: "",
        },
        EventVideoTrailer: null,
      };
    
      console.log(body);

      console.log(getHeaderToken());
      const res = axios
        .put(
          `{https://localhost:5001/api/EventController/AssignFilesToEvent`,
          body
        )
        .then(
          (res) => {
            console.log(res);
            if (res.status === 200) alert("upload Success");
          },
          (error) => {
            alert("upload didnt work,  please try again", error);
          }
        );
    }
    reader.readAsArrayBuffer(file)
    })
   
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})
 
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}