import { useState } from "react"
import UploadFile from "../utils/mediaUpload";

export default function TestPage() {

    //Upload krna hamawelakama file eke data me variable ekta save krgnwna
    const [file, setFile] = useState(null);

    async function handleUpload() {

        //file ek upload krala eke URL eka dennm kiyla promise ekk denawa 
        const url = await UploadFile(file)
        console.log(url)
    }

    return(

        <div className="w-full h-full flex flex-col justify-center items-center">
            <input type="file" onChange={(e) => {
                
                setFile(e.target.files[0])

            }} />

            <button onClick={handleUpload}
            
            className="w-[100px] p-[15px] bg-red-700 rounded-2xl text-white mt-[40px]">
                Upload
            </button> 
        </div>
    )
}