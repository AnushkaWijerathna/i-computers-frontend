import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Header() {

    return(
        // Improved header: glassy background, better spacing, subtle shadow
        <header className="w-full h-[100px] bg-accent/90 backdrop-blur-md flex items-center relative px-8 shadow-sm">
            
            {/* Logo with better sizing & alignment */}
            <img 
                src="/logo.png"  
                className="h-[70%] object-contain select-none" 
                alt="logo"
            />

            {/* Navigation - improved typography, spacing, hover micro-interactions */}
            <div className="w-full h-full flex text-primary justify-center items-center gap-8 text-lg font-medium">
                <Link 
                    to="/" 
                    className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full transition-colors hover:text-primary/80"
                >
                    Home
                </Link>
                <Link 
                    to="/products" 
                    className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full transition-colors hover:text-primary/80"
                >
                    Products
                </Link>
                <Link 
                    to="/about" 
                    className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full transition-colors hover:text-primary/80"
                >
                    About Us
                </Link> 
                <Link 
                    to="/contact" 
                    className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full transition-colors hover:text-primary/80"
                >
                    Contact Us
                </Link>
            </div>

            {/* Cart icon - elevated, better touch target, subtle hover animation */}
            <Link 
                to="/cart" 
                className="absolute right-6 top-1/2 -translate-y-1/2 text-primary text-2xl p-3 rounded-full hover:bg-primary/10 transition-all duration-200 hover:scale-105"
            >
                <BiShoppingBag/>
            </Link>
        </header>
    )
}