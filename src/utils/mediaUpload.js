import { createClient } from "@supabase/supabase-js";

const url ="https://rbluuzyoyufxtvwhdvka.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibHV1enlveXVmeHR2d2hkdmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODc3NjEsImV4cCI6MjA4NDc2Mzc2MX0.lU1r8eTaifjsHdzsqJY2T7b8xBMaAUvOZF6UgBUKkXs"

//Superbase connector
const superbase = createClient(url,key)

export default function UploadFile(file) { 

        return new Promise(
            (resolve, reject) => {
                 
                const timeStamp = Date.now()
                const fileName = timeStamp + "_"+file.name
                    
                //superbase eke bucket ekta file eka, file name eka upload wenwa
                superbase.storage.from("images").upload(
                    fileName, 
                    file,{
                        cacheControl : "3600",
                        upsert : false,            
                }).then(
                    () => {
                        //superbase "images" bucket eke "file.name" wlin ena file ekta adala publicUrl eka, ape variable ekta save knwa                
                        const publicUrl = superbase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                        resolve(publicUrl)        
                    }
                ).catch((error) => {
                    reject(error)
                })       
            }
        ) 
       
    }
