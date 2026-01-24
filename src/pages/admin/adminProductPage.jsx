import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProductDeleteButton from "../../components/productDelete";

export default function AdminProductPage() {

    //Products useEffect eke function eken fetch krla setProducts ekta danwa...eka products array ekta dala ee array eke data map function eken adala "th" walta map krnwa 
    //mokk hri deyk dispaly krna page ekka aniwaryne useState dekk enwa products,loaded (backend eken data fetch krla organize krala iwrda blnna)
    
    const[products,setProducts] = useState([]);
    const[loaded,setLoaded] = useState(false);

    //methanadi page eka load weddi eka parak run wenwa backEnd eken data fetch kra "products[]" set kranwa, delete dunna gmn "loaded">false una,
    //apahu run karla API eken data fetch krala modified Products[] load krnnwa, remove deleted products

    useEffect( 
        () =>{ 

            if (!loaded) {
                
                axios.get(import.meta.env.VITE_BACKEND_URL + "/products/")
                .then(
                    (response) =>{
                        
                        console.log(response.data)
                        setProducts(response.data) 
                        setLoaded(true)

                    }
                )
            }
        } 
    ,[loaded]);

    return(
        <div className="w-full max-h-full flex justify-center p-10 relative bg-[var(--color-primary)]">
            <div className="w-full max-w-[1300px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="w-full overflow-x-auto">
                
                {/*Loaded nm wtrak table eka display krnna else (":") loading icon eka display krnna */}
                {loaded ?   
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[var(--color-accent)]">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Images</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Product ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Price</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Labelled Price</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Category</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Model</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Brand</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Stock</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Availability</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Delete</th>
                            </tr>
                        </thead>

            <tbody className="bg-white divide-y divide-gray-100">
{/* Loop through the "products" array and display each product's details...Array ekk dila map dunnma eka athule liyna function eka items okkotama run wela table data wdhta display krnwa
    ...Array ekka thiyena dewal web page ekka dagnna one nm ee array eka map krla, ee map krna fucntions athulen array data walta adala html component eka return krnwa  
*/}
                    {   
                        products.map(
                            (item,index) => {
                                return(
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <img src={item.images[0]} className="w-12 h-12 rounded-md object-cover border border-gray-100 shadow-sm" /> 
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[var(--color-secondary)]">{item.productID}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-[var(--color-golden)]">LKR {item.price}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-[var(--color-golden)]">LKR {item.labelledPrice}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.category}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.model}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.brand}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-[var(--color-secondary)]">
                                                {item.stock}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            {item.isAvailability ? (
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                                                    Yes
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 font-medium">
                                                    No
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-3-text-sm">
                                            <div className="inline-flex items-center gap-2 opacity-60">
                                                <ProductDeleteButton productID={item.productID} reload={ () => {setLoaded(false)}}/>
                                            </div>
                                        </td>
                                    </tr>
                                )                  
                            }
                        )
                    }
                    </tbody>
                </table>    
                    
                    : <div>Loading</div>}

            </div>
        </div>    

        <Link to="/admin/add-product" 
        className="w-[50px] h-[50px] flex justify-center items-center text-6xl fixed right-[20px] bottom-5 hover:text-white hover:bg-accent rounded-full text-accent border-4 border-accent">
            <BiPlus />
        </Link>
    </div>
   )
}       