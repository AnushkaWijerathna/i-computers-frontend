import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

//Eka parak page eka load weddi parameter ekta(ID) adala product details tika pennanna one 
//Page shoulbe 01)Loading 02)Showing an error because no products found 03)Showing product 
export default function ProductOverview() {

    //"useParams()" URL ekta Pass wela ena parameters pennanwa...methna nm productID ek
    const params = useParams()    
    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading") //loading,error or success

    //load weddi products retrieve krnna
    useEffect(
        () => {

            if (status == "loading") {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/products/" +params.productID) //Backend eke haduwa getProductById eka call wenne
                .then(
                    (response) => {
                        setProduct(response.data)
                        setStatus("success")
                    }
                ).catch(
                    () => {
                        toast.error("Product Not Found")
                        setStatus("error")
                    }
                )
            }
        },[]
    )

    //status eka loading nm "loading", success nm products error nm error ekak
    return(
       <>    
            {
                
                status == "loading" && <h1 className="text-2xl font-medium tracking-widest text-gray-700 flex items-center ">
                                            Loading...
                                        </h1>
            }
            {
                status == "error" && <h1 className="text-2xl font-medium tracking-widest text-gray-700">
                                        Error Loading Products...
                                    </h1>
            }
            {
                status == "success" && 
               <div className="w-full h-[calc(100vh-100px)] flex">
                    
                    {/*Image  */}
                    <div className="w-1/2 h-full bg-blue-500 flex justify-center items-center">
                        <img 
                            src={product.images[0]}
                            className="max-w-[80%] max-h-[80%] bject-contain"
                        />
                    </div>

                    {/*Details */}
                    <div className="w-1/2 h-full bg-white flex justify-center items-center">
                        <h1 className="text-xl font-semibold text-black">{product.name}</h1>
                    </div>

                </div>
            }
       </>
    )
} 