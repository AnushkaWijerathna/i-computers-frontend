import { useState } from "react"
import { addToCart, getCart, getTotalCart } from "../utils/cart"
import { BsChevronUp } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function CartPage() {
    
    const [cart, setCart] = useState(getCart())
    console.log("CART STATE:", cart, cart.length)

    return(
        <div className="w-full flex flex-col items-center p-2.5 cursor-auto">
            {
                cart.map(
                    (item) => {

                        return (
                        
                            <div
                                key={item.productID}
                                className="w-[50%] h-[200px] my-3 flex items-center gap-6
                                        bg-white rounded-2xl border border-gray-300
                                        shadow-lg hover:shadow-2xl transition-shadow duration-300 justify-between"
                                >
                                {/* Product Image */}
                                <div className="h-full aspect-square flex items-center justify-center p-3">
                                    <img
                                        src={item.image}
                                        className="h-full w-full object-contain rounded-xl
                                                transition-transform duration-300 hover:scale-105"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex flex-col justify-center gap-2 pr-4">
                                    {/* Product name with instant hover tooltip */}
                                    <div className="relative group w-fit max-w-full">
                                        <h1 className="text-[16px] md:text-[20px] font-semibold
                                                    text-gray-900 leading-snug cursor-pointer">
                                            {item.name.length > 15
                                                ? item.name.slice(0, 15) + "...."
                                                : item.name}
                                        </h1>

                                        {/* Tooltip showing full name instantly on hover */}
                                        {item.name.length > 15 && (
                                            <div className="absolute left-0 top-full mt-1 z-50
                                                            hidden group-hover:block
                                                            max-w-xs rounded-lg bg-gray-900
                                                            px-3 py-1.5 text-sm text-white shadow-lg">
                                                {item.name}
                                            </div>
                                        )}
                                </div>

                                {/* Original price (only if discounted) */}
                                {item.labelledPrice > item.price && (
                                    <h2 className="text-[14px] text-gray-400 line-through">
                                        LKR {item.labelledPrice.toFixed(2)}
                                    </h2>
                                )}

                                {/* Current price */}
                                <h2 className="text-[20px] md:text-[22px] font-bold
                                            text-emerald-600 tracking-tight">
                                    LKR {item.price.toFixed(2)}
                                </h2>

                                {/* Quantity */}
                                <p className="text-[14px] text-gray-500">
                                    ProductID:
                                    <span className="ml-1 font-semibold text-gray-800">
                                        {item.productID}
                                    </span></p>
                                </div>

                                <div className="h-full flex flex-row items-center gap-4">
                                    <div className="h-full flex flex-col justify-center items-center">
                                        <BsChevronUp 
                                            onClick={
                                                () => {
                                                    addToCart(item, 1);
                                                    const newCart = getCart();
                                                    setCart(newCart);
                                                }
                                            }
                                            className="text-2xl cursor-pointer hover:text-accent transition"/>
                                            <span className="text-lg">{item.quantity}</span>
                                        <BsChevronUp 
                                             onClick={
                                                () => {
                                                    addToCart(item, -1);
                                                    const newCart = getCart();
                                                    setCart(newCart);
                                                }
                                            }
                                            className="rotate-180 text-2xl cursor-pointer hover:text-accent transition"/>
                                    </div>    
                                </div>

                                <div>
                                    <span className="pr-4 text-lg font-semibold ">LKR: {(item.price*item.quantity).toFixed(2)}</span>
                                </div>
                            </div>                          
                        );
                    }
                )
            }
           <div className="w-full md:w-[50%] h-[150px] my-2 flex flex-col md:flex-row items-center justify-between
                bg-white rounded-2xl shadow-lg border border-gray-100 p-4 gap-4">
                
                {/* Continue Shopping Button */}
                <Link 
                    to="/products" 
                    className="px-6 py-3 rounded-xl bg-accent text-white font-semibold 
                            hover:bg-white hover:text-accent transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Continue Shopping
                </Link>

                <Link 
                    to="/checkOut" 
                    className="px-6 py-3 rounded-xl bg-white text-accent border-2 font-semibold 
                        hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg ml-[-180px]"
                    state={cart} // cart eke details aran ynwanwa   
                >
                    Check Out
                </Link>

                {/* Total Price */}
                <span className="text-lg md:text-xl font-bold text-gray-900 text-right w-full md:w-[150px]">
                    LKR: {getTotalCart()}
                </span>    

            </div>

        </div>
    )
}