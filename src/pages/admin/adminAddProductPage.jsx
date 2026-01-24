import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcAddDatabase } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import UploadFile from "../../utils/mediaUpload";

export default function AdminAddProductPage() {

    const[productID, setProductID] = useState("");
    const[name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState("");
    const[labelledPrice, setLabelledPrice] = useState("");
    const[files, setFiles] = useState([]);
    const[category, setCategory] = useState("");
    const[model, setModel] = useState("");
    const[brand, setBrand] = useState("");
    const[stock, setStock] = useState("");
    const[isAvailability, setIsAvailability] = useState(false);
    
    const navigate = useNavigate();

    //product add handler function...form eka ok nm hari thnatai, token nttn login page kta yanawa 
    async function createProduct() {
        
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        console.log(files)

        //files array eke thyena hama file ekktama add krnna kiyla promise hadagena, imagePromises array ekta promises okkoma danwa
        const imagePromises = []

        //picture ek upload krl URL ek dennm kiyla hadapu promise ek...forEach eken array eke thiyena hama file ektama promise ek denwa
        for (let i = 0; i < files.length; i++) {

            const promise = UploadFile(files[i])
            imagePromises.push(promise)
        }

        //promises okkoma eka wara complete krla result eka "images" walta dnwa
        const images = await Promise.all(imagePromises).catch(
            (error) => {
                toast.error("Error uploading images")
                console.log("error ")
                console.log(error)
                return
            })


        if (productID=="" || name=="" || description=="" || price=="" || category=="" || model=="" || brand=="" ) {
            toast.error("Please fill all the fields");
            return;
        }

        //Uda conditions ok nm product add krnna api(backend) call ekak dnnn
        //frontend --> backend --> index.js --> controllers/productController.js --> createProduct function eka
        try {
            
            //Comma separated values walata array ekak hdnna
            const altNamesInArray = altNames.split(",")

            //Post request eka --> "await axios.post(url, data, config)" , config kiynne userge token eka
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/products/",{ 

                productID : productID,
                name : name,
                altNames : altNamesInArray,
                description : description,
                price : price,
                labelledPrice : labelledPrice,
                images : images,        
                category : category,
                model : model,
                brand : brand,
                stock : stock,
                isAvailability : isAvailability

            }, {
                headers : {
                    Authorization :"Bearer " + token
                }
            })

            toast.success("Product added successfully");
            navigate("/admin/products");

        } catch (error) {
            toast.error("Error adding product");
            console.log(error);
        }
    }

    //Product form
    return(
        <div className="w-full h-full flex justify-center p-[50px] items-start overflow-y-scroll ">   
            <div className="w-[800px] p-[30px] bg-accent/75 rounded-2xl shadow-2xl overflow-y-visible">
                <h1 className="text-xl text-primary mb-[20px] text-center gap-[15px]"><FcAddDatabase className="inline mr-2" />Add New Product</h1>
                <div className="w-full bg-white p-[20px] flex flex-row flex-wrap justify-between rounded-xl">

                    <div className="my-[10px] flex flex-col w-[40%] group">
                        <label className="p-1.5 flex flex-col">ProductID</label>
                        <input 
                            type="text" value={productID} onChange={(e) => setProductID(e.target.value)}  
                            className="w-full h-[40px] mb-[5px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                        <p className="text-sm text-gray-500 text-right opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">Provide a unique ID</p>
                    </div>

                    <div className="my-[10px] flex flex-col w-[40%]">
                        <label className="p-1.5">Product Name</label>
                        <input 
                            type="text" value={name} onChange={(e) => setName(e.target.value)}  
                            className="w-full h-[40px] mb-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>

                     <div className="my-[10px] flex flex-col w-full group">
                        <label className="p-1.5">Alternative Names</label>
                        <input 
                            type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)}  
                            className="w-full h-[40px] mb-[5px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                        <p className="text-sm text-gray-500 text-right opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">Separate multiple names with commas</p>
                    </div>

                    <div className="my-[10px] flex flex-col w-full">
                        <label className="p-1.5">Description</label>
                        <textarea 
                            type="text" value={description} onChange={(e) => setDescription(e.target.value)}  
                            className="w-full h-[40px] mb-[10px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px] py-[5px]"
                        />
                    </div>

                    <div className="my-[10px] flex flex-col w-[40%]">
                        <label className="p-1.5">Price</label>
                        <input 
                            type="number" value={price} onChange={(e) => setPrice(e.target.value)}  
                            className="w-full h-[40px] mb-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>

                    <div className="my-[10px] flex flex-col w-[40%]">
                        <label className="p-1.5">Labelled Price</label>
                        <input 
                            type="number" value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)}  
                            className="w-full h-[40px] mb-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>

                    <div className="my-[10px] flex flex-col w-full">
                        <label className="p-1.5">Images</label>
                        <input 
                            type="file"
                            multiple={true} //Selecting multiple files
                            onChange={(e) => 
                                setFiles(e.target.files)
                            }  
                            className="w-full h-[40px] mb-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>

                    <div className="my-[10px] flex flex-col w-[30%]">
                        <label className="p-1.5">Category</label>
                        
                        <select value={category} onChange={(e) => setCategory(e.target.value)} 
                            className="w-full border rounded-2xl px-[10px] p-2 mb-[20px] focus:outline-none focus:ring-2 focus:ring-accent border-accent shadow-2xl">
                                <option value="">Select Category</option>
                                <option value="cpu">CPU</option>
                                <option value="gpu">Graphics Cards</option>
                                <option value="motherboard">Motherboard</option>
                                <option value="psu">Power Supply</option>
                                <option value="ram">RAM</option>
                                <option value="storage">Storage</option>
                                <option value="cooling">Cooling Solutions</option>
                                <option value="case">Computer Case</option>
                                <option value="mouse and keyboard">Mouse and Keyboard</option>
                                <option value="accessories">Accessories</option>    
                                <option value="monitor">Monitors</option>
                                <option value="computers">Computers</option>
                                <option value="laptop">Laptops</option>
                                <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="my-[10px] flex flex-col w-[30%]">
                        <label className="p-1.5 ">Model</label>
                        <input 
                            type="text" value={model} onChange={(e) => setModel(e.target.value)}  
                            className="w-full h-[40px] mb-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>
                    <div className="my-[10px] flex flex-col w-[30%]">
                        <label className="p-1.5 ">Brand</label>
                        <input 
                            type="text" value={brand} onChange={(e) => setBrand(e.target.value)}  
                            className="w-full h-[40px] mb-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>
                    <div className="my-[10px] flex flex-col w-[40%]">
                        <label className="p-1.5 ">Stock Quantity</label>
                        <input 
                            type="number" value={stock} onChange={(e) => setStock(e.target.value)}  
                            className="w-full h-[40px] mb-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>

                           <div className="my-[10px] flex flex-col w-[40%]">
                        <label className="p-1.5">Availability</label>
                        
                        <select value={isAvailability ? "true" : "false"} onChange={(e) => setIsAvailability((e.target.value === "true"))} 
                            className="w-full border rounded-2xl px-[10px] p-2 mb-[20px] focus:outline-none focus:ring-2 focus:ring-accent border-accent shadow-2xl">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                        </select>
                    </div> 

                        <Link to="/admin/products" className="w-[49%] h-[50px] bg-accent text-white rounded-2xl hover:bg-red-800 shadow-2xl text-xl flex justify-center items-center ">
                            Cancel
                        </Link>
                       
                        <button className="w-[49%] h-[50px] bg-accent text-white rounded-2xl hover:bg-[#29c548] hover:text-accent shadow-2xl text-xl" 
                        onClick={createProduct}>
                             Add Product
                        </button>      
                </div>
            </div>
        </div>
    )
}