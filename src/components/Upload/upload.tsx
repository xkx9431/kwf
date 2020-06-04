import React, {FC,useRef} from 'react'
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

    return (
        <div
            className = "xkx-upload-component"
            >
            <Button btnType = {ButtonType.Primary} onClick = {handleOnclick}> Upload File</Button>
            <input type="file"
                className = 'xkx-file-input'
                style  = {{display:'none'}}
                ref ={ fileInputRef }
            />
        </div>
    )
}

export default Upload;