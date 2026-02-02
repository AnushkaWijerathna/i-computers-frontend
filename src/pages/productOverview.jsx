import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../components/imageSlider";
import { addToCart, getCart } from "../utils/cart";

//Eka parak page eka load weddi parameter ekta(ID) adala product details tika pennanna one 
//Page shoulbe 01)Loading 02)Showing an error because no products found 03)Showing product 
//functions - Slide function if have multiple images, product details, add to cart and checkout buttons
export default function ProductOverview() {

    //"useParams()" URL ekta Pass wela ena parameters pennanwa...methna nm productID ek
    const params = useParams()    
    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading") //loading,error or success
    const navigate = useNavigate()

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
                    <div className="w-1/2 h-full bg-white flex items-center justify-center">
                        <ImageSlider images={product.images}/>
                    </div>

                    {/*Details */}
                    <div className="w-1/2 h-full bg-white flex justify-center items-center overflow-y-scroll">
                        <div className="w-[85%] max-h-[90%] bg-gray-50 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
                            
                            {/* Product Header */}
                            <div className="mb-4">
                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                    {product.name}
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Product ID: {product.productID}
                                </p>
                            </div>

                            {/* Category */}
                            <div className="mb-4">
                                <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-accent/10 text-accent">
                                    {product.category}
                                </span>
                            </div>  

                            {/* Description */}
                            <div className="flex-1 overflow-y-auto pr-2 mb-6">
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {product.description}
                                </p>
                            </div>                           

                            {/* Price */}
                            <div className="border-t pt-4">
                                {product.labelledPrice > product.price && (
                                    <h2 className="text-sm text-gray-500 line-through">
                                    LKR {product.labelledPrice.toFixed(2)}
                                </h2>
                                )}

                                <h2 className="text-3xl font-bold text-accent">
                                    LKR {product.price.toFixed(2)}
                                </h2>
                            </div>     

                            <div className="flex gap-4">
                                {/* Add to Cart */}
                                <button
                                    onClick={
                                        () => {
                                            const result = addToCart(product,1)

                                             if (result?.success) {
                                                toast.success("Added to cart")
                                            } 
                                            console.log(getCart())
                                        }
                                    }
                                    className="flex w-[150px] h-[52px] rounded-xl border-2 border-accent text-accent font-semibold text-lg
                                        hover:bg-accent hover:text-white transition-all duration-300 active:scale-95 items-center justify-center">
                                         Add to Cart
                                </button>


                                {/* Buy Now */}
                                <button onClick={
                                        ()=>{
                                            navigate("/checkOut",{state:[
                                                {
                                                    productID:product.productID,
                                                    name: product.name,
                                                    price:product.price,
                                                    labelledPrice:product.labelledPrice,
                                                    image:product.images[0],
                                                    quantity:1
                                                }
                                            ]})
                                        }
                                    }
                                    className="flex w-[150px] h-[52px] rounded-xl bg-accent text-white font-bold text-lg
                                    hover:text-black hover:bg-white border-2 border-accent transition-all duration-300 active:scale-95 items-center justify-center">
                                         Buy Now
                                </button>
                            </div>

                        </div>

                        
                    </div>

                </div>
            }
       </>
    )
} 