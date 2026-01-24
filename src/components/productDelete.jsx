import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast";

{/*Delete function also the useEffect function should be called once when using delete for proper UX*/}
export default function ProductDeleteButton(props) {
    
    const productID = props.productID;
    
    const [message, setMessage] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const reload = props.reload 
async function handleDelete() {
    try {
        setIsDeleting(true);

        const token = localStorage.getItem("token");

        await axios.delete(
            import.meta.env.VITE_BACKEND_URL + "/products/" + productID,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        toast.success("Product deleted successfully");
        setMessage(false);
        setIsDeleting(false);
        reload();

    } catch (error) {
        toast.error("Failed to delete product");
        console.error(error);
        setIsDeleting(false);
    }
}

    //Return ekak athule return wenne major component ekk wtrai...methna major components dekak thiyena nisa empty component ekk athule me deka return krnwa
    return(
        <>        
            <button onClick={
                () => {
                    setMessage(true)

            }} className="w-[70px] bg-red-500 flex justify-center items-center text-white p-2 rounded-lg cursor-pointer hover:bg-red-800">    
                Delete
            </button>

            {/*z-50 → brings popup above table */}
        
            {message && (
                <div className="w-[100vw] h-screen fixed inset-0 z-[9999] flex items-center justify-center">
                    {/* dimmed background */}
                    <div className="absolute inset-0 bg-black opacity-100"></div>


                    {/* solid white popup */}
                    <div className="relative bg-primary w-[400px] h-[200px] rounded-2xl flex flex-col justify-center items-center p-6 shadow-2xl z-10">
                        <button onClick={() => {setMessage(false)}} className="w-[40px] h-[40px] bg-red-700 rounded-full text-white text-2xl text-bold cursor-pointer hover:bg-red-950 absolute right-[-15px] top-[-15px]">
                            X
                        </button>
                        <p className="text-black text-lg font-medium text-center mb-6 text-bold">
                            Are you sure you want to delete {productID}? 
                        </p>

                        {/* If press Yes, a loading should appear and delete the item */}
                        <div className="flex gap-10">

                            <button 
                                onClick={handleDelete}
                                disabled = {isDeleting} //If it is inthe process of deleting, user can't press the delete button again until the process is complete
                                className="bg-red-600 text-white px-4 py-2 rounded-lg w-[80px] hover:cursor-pointer">
                                    Yes
                            </button>

                            <button className="bg-gray-300 text-black px-4 py-2 rounded-lg w-[80px] hover:cursor-pointer">
                                No
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>

    )
}