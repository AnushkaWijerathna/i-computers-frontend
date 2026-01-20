import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
   return(
    <div className="w-full h-full flex bg-primary justify-center items-center text-2xl relative"> 
        Admin Product Page

        <Link to="/admin/add-product" 
        className="w-[50px] h-[50px] flex justify-center items-center text-6xl absolute right-[20px] bottom-5 hover:text-white hover:bg-accent rounded-full text-accent border-4 border-accent">
            <BiPlus />
        </Link>
    </div>
   )
}       