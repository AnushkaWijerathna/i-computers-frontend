//"Routes" athule direct thiyena components /maru wena pages daganne pages folder walta
//general components thma components page kta ynne

import { Link, Route, Routes } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlineReviews } from "react-icons/md";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adminAddProductPage";

export default function AdminPage() {
   return(
    <div className="w-full h-screen flex bg-accent">

      {/* Admin Page sidepanel; header eka, links tika*/}
      <div className="w-75 h-full bg-accent">
         
         <div className="w-full h-[100px] text-primary flex items-center">
            <img src="/logo.png"  className="h-full" alt="logo"/>
            <h1>Admin</h1>
         </div>

         <div className="w-full h-[400px] text-white text-2xl flex flex-col gap-[10px] pl-[20px] pt-[30px]">
            
            <Link to="/admin" className="w-full flex h-[50px] gap-[10px]  items-center"> <FaClipboardList />Orders</Link>
            <Link to="/admin/products" className="w-full flex h-[50px] gap-[10px] items-center"><BsBoxes />Products</Link>
            <Link to="/admin/users" className="w-full flex h-[50px] gap-[10px] items-center"><FiUsers />Users</Link>
            <Link to="/admin/reviews" className="w-full flex h-[50px] gap-[10px] items-center"><MdOutlineReviews />Reviews</Link>
         </div>

      </div>
      {/* Admin Page main content area which is a dynamic page that changes with the URL..."calc(%-px)" calculates the pixel area that is wanted to manage by a "div"*/}
      <div className="w-[calc(100%-300px)] h-full max-h-full border-[10px] rounded-3xl overflow-y-scroll border-accent bg-primary">                         
         <Routes>
            <Route path="/" element={<h1>Orders</h1>} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/add-product" element={<AdminAddProductPage />} />   
            <Route path="/users" element={<h1>Users</h1>} />
            <Route path="/reviews" element={<h1>Reviews</h1>} />
         </Routes>
      </div>
   </div>
   )
}