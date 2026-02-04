import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { BsChevronUp } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom"



export default function CheckOutPage() {
    
    //Checkout ekta enne cart eke data ekka... ewa read krnna useLocation hook eka use krnwa
    const location = useLocation()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [address,setAddress] = useState("")
    const [phone,setPhone] = useState("")
    const [cart, setCart] = useState(location.state)


    if (location.state == null) {
        navigate("/products")
    }

    function getCartTotal() {
        
            let total = 0
        
            cart.forEach(
                (item) => {
                    total +=item.price*item.quantity      
            });
        
            return total.toFixed(2);
        
    }

    async function submitOrder() {
        const token = localStorage.getItem("token")

        if (token == null) {
            toast.error("Login before placing an order")
            navigate("/login")
            return;
        }

        const orderItems = []

        cart.forEach((item) => {
            orderItems.push({
                productID: item.productID, 
                quantity: item.quantity
            })
        })

        axios.post(import.meta.env.VITE_BACKEND_URL+"/orders" ,{
            
            name : name,
            address: address,
            phone:phone,
            items: orderItems
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then(()=>{
            toast.success("Order Placed Succesfully")
            navigate("/")
        }).catch(()=>{
            toast.error("error placing order")
        })
    }

    return(
        <div className="w-full flex flex-col items-center p-2.5 cursor-auto">
            {
                cart.map(
                    (item,index) => {

                        return (
                        
                            <div
                                key={item.productID}
                                className="w-full lg:w-[55%] my-3
                                        flex flex-col lg:flex-row items-center lg:items-center gap-4 lg:gap-6
                                        bg-white rounded-2xl border border-gray-300
                                        shadow-lg hover:shadow-2xl transition-all duration-300 px-3 py-4 lg:p-4 justify-between"
                                >
                                {/* Product Image */}
                                <div className="w-full lg:w-[120px] flex items-center justify-center p-3">
                                    <img
                                        src={item.image}
                                        className="h-[100px] lg:h-[140px] w-auto object-contain rounded-xl
                                                transition-transform duration-300 hover:scale-105"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex flex-col justify-center gap-2 pr-4 w-full lg:w-auto text-center lg:text-left">
                                    {/* Product name with instant hover tooltip */}
                                    <div className="relative group w-full max-w-full">
                                        <h1 className="text-[16px] md:text-[20px] font-semibold
                                                    text-gray-900 leading-snug cursor-pointer truncate">
                                            {item.name.length > 15
                                                ? item.name.slice(0, 15) + "...."
                                                : item.name}
                                        </h1>

                                        {/* Tooltip showing full name instantly on hover */}
                                        {item.name.length > 15 && (
                                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-50
                                                            hidden group-hover:block
                                                            max-w-xs rounded-lg bg-gray-900
                                                            px-3 py-1.5 text-sm text-white shadow-lg">
                                                {item.name}
                                            </div>
                                        )}
                                </div>

                                {/* Original price (only if discounted) */}
                                {item.labelledPrice > item.price && (
                                    <h2 className="text-[14px] text-gray-400 line-through mt-1">
                                        LKR {item.labelledPrice.toFixed(2)}
                                    </h2>
                                )}

                                {/* Current price */}
                                <h2 className="text-[20px] md:text-[22px] font-bold
                                            text-emerald-600 tracking-tight">
                                    LKR {item.price.toFixed(2)}
                                </h2>

                                {/* ProductID */}
                                <p className="text-[14px] text-gray-500">
                                    ProductID:
                                    <span className="ml-1 font-semibold text-gray-800">
                                        {item.productID}
                                    </span></p>
                                </div>

                                <div className="w-full lg:w-auto flex items-center justify-center lg:justify-start mt-3 lg:mt-0">
                                    <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-2 shadow-md">
                                        <BsChevronUp 
                                            onClick={
                                                () => {
                                                    //cart eka copy krgnnwa, ita passe item add kroth copied cart eke adala index eke thiyena quantity eka increment by 1
                                                    const copyCart = [...cart]
                                                    copyCart[index].quantity +=1
                                                    setCart(copyCart) 
                                                }
                                            }
                                            className="text-2xl cursor-pointer hover:text-accent transition"/>
                                            <span className="text-lg">{item.quantity}</span>
                                        <BsChevronUp 
                                            onClick={
                                                 () => {
                                                    //item ain kroth copied cart eke adala index eke thiyena quantity eka decrement by 1, 1 ta wada adu nm ee index eka remove krnwa
                                                    const copyCart = [...cart]
                                                    copyCart[index].quantity -= 1

                                                    if (copyCart[index].quantity < 1) {
                                                        copyCart.splice(index,1)
                                                    }
                                                    setCart(copyCart)
                                                }
                                            }
                                            className="rotate-180 text-2xl cursor-pointer hover:text-accent transition"/>
                                    </div>    
                                </div>

                                <div className="mt-3 lg:mt-0">
                                    <span className="pr-4 text-lg font-semibold ">LKR: {(item.price*item.quantity).toFixed(2)}</span>
                                </div>
                            </div>                          
                        );
                    }
                )
            }

            <div className="w-full md:w-[55%] my-3 flex flex-col gap-5
                bg-white rounded-2xl shadow-lg border border-gray-100
                p-6">

                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className=" w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm
                                    focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent hover:border-gray-400 transition-all duration-200"
                    />
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        Address
                    </label>
                    <textarea
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className=" w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm
                                    focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent hover:border-gray-400 transition-all duration-200"
                    />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                        Phone
                    </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className=" w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm
                                    focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent hover:border-gray-400 transition-all duration-200"
                    />
                </div>

            </div>


           <div className="w-full md:w-[55%] h-auto my-2 flex flex-col md:flex-col items-center 
                bg-primary p-4 gap-4">

                <button onClick={ // unchanged logic
                    () => {
                        submitOrder()
                    }
                }
                    className="px-6 py-3 rounded-xl bg-white text-accent border-2 font-semibold 
                    hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-[150px]">
                        Order Now
                </button>

                {/* Total Price */}
                <span className="text-lg md:text-xl font-bold text-gray-900 text-right w-full md:w-[150px]">
                    LKR: {getCartTotal()}
                </span>      
            </div>
        </div>
    )
}
