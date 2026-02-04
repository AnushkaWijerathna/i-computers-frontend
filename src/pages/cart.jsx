import { useState } from "react"
import { addToCart, getCart, getTotalCart } from "../utils/cart"
import { BsChevronUp } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function CartPage() {
    
    const [cart, setCart] = useState(getCart())

    return(
        <div className="w-full flex flex-col items-center p-2.5 cursor-auto">
            {
                cart.map((item,index) => (
                    <div
                        key={index}
                        className="bg-primary/70 w-full lg:w-[55%] my-3
                                   flex flex-col lg:flex-row
                                   items-center lg:items-center
                                   gap-4 lg:gap-8
                                   rounded-2xl border border-gray-300
                                   shadow-lg hover:shadow-accent/70 transition-all duration-300
                                   px-3 py-4 lg:p-5"
                    >

                        {/* mobile title */}
                        <h1 className="w-full text-xl font-semibold text-accent lg:hidden text-center">
                            {item.name}
                        </h1>

                        {/* image */}
                        <div className="flex flex-col items-center w-full lg:w-[160px]">
                            <img
                                src={item.image}
                                className="h-[100px] lg:h-[140px] object-contain rounded-xl transition-transform duration-300 hover:scale-105"
                            />

                            {item.labelledPrice > item.price && (
                                <h2 className="text-sm text-gray-400 line-through mt-2 lg:hidden">
                                    LKR {item.labelledPrice.toFixed(2)}
                                </h2>
                            )}

                            <h2 className="text-xl font-bold text-emerald-600 lg:hidden">
                                LKR {item.price.toFixed(2)}
                            </h2>
                        </div>

                        {/* mobile qty */}
                        <div className="lg:hidden w-full flex justify-center mt-2">
                            <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-2 shadow-md">
                                <BsChevronUp
                                    onClick={() => {
                                        addToCart(item, 1)
                                        setCart(getCart())
                                    }}
                                    className="text-2xl cursor-pointer hover:text-accent"
                                />
                                <span className="text-lg font-semibold">{item.quantity}</span>
                                <BsChevronUp
                                    onClick={() => {
                                        addToCart(item, -1)
                                        setCart(getCart())
                                    }}
                                    className="rotate-180 text-2xl cursor-pointer hover:text-accent"
                                />
                            </div>
                        </div>

                        {/* ===== DESKTOP (lg) MODERNIZED ===== */}
                        <div className="hidden lg:flex flex-1 items-center justify-between bg-white/70 backdrop-blur-md rounded-xl px-6 py-4 shadow-inner">

                            {/* details */}
                            <div className="flex flex-col gap-1 max-w-[280px]">
                                <h1 className="text-lg font-semibold text-gray-900 truncate">
                                    {item.name}
                                </h1>

                                <p className="text-xs text-gray-500">
                                    Product ID: <span className="font-medium text-gray-700">{item.productID}</span>
                                </p>

                                {item.labelledPrice > item.price && (
                                    <span className="text-sm text-gray-400 line-through">
                                        LKR {item.labelledPrice.toFixed(2)}
                                    </span>
                                )}

                                <span className="text-xl font-bold text-emerald-600">
                                    LKR {item.price.toFixed(2)}
                                </span>
                            </div>

                            {/* qty */}
                            <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-2 shadow-md">
                                <BsChevronUp
                                    onClick={() => {
                                        addToCart(item, 1)
                                        setCart(getCart())
                                    }}
                                    className="text-xl cursor-pointer hover:text-accent"
                                />
                                <span className="text-lg font-semibold">{item.quantity}</span>
                                <BsChevronUp
                                    onClick={() => {
                                        addToCart(item, -1)
                                        setCart(getCart())
                                    }}
                                    className="rotate-180 text-xl cursor-pointer hover:text-accent"
                                />
                            </div>

                            {/* subtotal */}
                            <div className="text-right">
                                <span className="text-sm text-gray-500">Subtotal</span>
                                <p className="text-lg font-bold text-gray-900">
                                    LKR {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }

            {/* checkout */}
            <div className="w-full md:w-[55%] my-3 flex flex-col gap-4
                            bg-white rounded-2xl shadow-lg border border-gray-100 p-4 items-center">

                <Link
                    to="/products"
                    className="px-6 py-3 rounded-xl bg-accent text-white font-semibold
                               hover:bg-white hover:text-accent transition-all shadow-md w-[50%] text-center"
                >
                    Continue Shopping
                </Link>

                <Link
                    to="/checkOut"
                    state={cart}
                    className="px-6 py-3 rounded-xl bg-white text-accent border-2 font-semibold
                               hover:bg-emerald-600 hover:text-white transition-all shadow-md w-[50%] text-center"
                >
                    Check Out
                </Link>

                <span className="text-xl font-bold text-gray-900 text-center">
                   Total: LKR {getTotalCart()}
                </span>
            </div>
        </div>
    )
}
