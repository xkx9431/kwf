import React, {FC,useRef, ChangeEvent} from 'react'
import axios from 'axios'

import  Button, {ButtonType} from '../Button/button'

export interface UploadProps{
    action:string;
    onProgress?:(percentage:number,file:File) =>void;
    onSuccess?:(data:any,file:File) => void;
    onError?:(err:any,file:File) =>void;
}



const Upload:FC<UploadProps> = ( props )=>{

    const {
        action,
        onError,
        onProgress,
        onSuccess
    } = props
    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleOnclick = ()=>{
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (e: ChangeEvent)=>{
        const files = e.target.files
        if(!files){
            return
        }
        uploadFiles(files)
        if(fileInputRef.current){
            fileInputRef.current.value = ''
        }
    }

    const uploadFiles = (files:FileList)=>{
        let postFiles = Array.from(files)
        postFiles.forEach(file=>{
            const formData = new FormData();
            formData.append(file.name, file)
            axios.post(action,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                onUploadProgress:(e)=>{
                    let percentage = Math.round(e.loaded*100/e.total) || 0;
                    if(percentage <100){
                        if(onProgress){
                            onProgress(percentage,file)
                        }
                    }
                }
            }).then(
                resp=>{
                    if(onProgress){
                        onSuccess(resp.data,file)
                    }
                }
            ).catch(err=>{
                console.log(err)
                if(onError){
                    onError(err,file)
                }
            })
        })
    }

    return (
        <div
            className = "xkx-upload-component"
            >
            <Button btnType = {ButtonType.Primary} onClick = {handleOnclick}> Upload File</Button>
            <input type="file"
                className = 'xkx-file-input'
                style  = {{display:'none'}}
                ref ={ fileInputRef }
                onChange = {handleFileChange}
            />
        </div>
    )
}

export default Upload;