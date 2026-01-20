import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const navigate = useNavigate();

    async function login() {
    
        console.log("Login Button Clicked");
        console.log("Email:",email);
        console.log("Password:",password);    

{/* Meken ganna data tika ynna one Url eka dila, ywnna one data tika denwa...DB eke user kenek store wela nm login succesful wenwa*/}

        if (!password || !email) {
            toast.error("Please Enter Valid Credentials");
        }
            
        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                email: email,
                password: password
            });

            console.log( res);

            if (res.data.role == "admin") {

                navigate("/admin");

            } 
            else if (res.data.role == "user") {
                navigate("/");
            }

            //alert message
            if (res.data.success) {
               toast.success("Login Successful");
            }
           
        } catch (error) {
            console.error("Login failed:", error ,error.response?.status, error.response?.data || error.message);
            toast.error("Login Failed" );
        }
       
    }

    return(
        <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">

            {/* Left side, "object-cover" image thibba whdta thiyenwa wens wen na*/}
            <div className="w-[50%] h-full flex flex-col p-[50px] justify-center items-center">

                <img src="/logo.png" alt="logo" className="w-[200px] h-[200px] object-cover" />
                <h1 className="text-[50px] text-golden text-shadow-2xs text-center font-bold ">Plug In Power Up Play Hard</h1>
                <p className="text-[30px] text-white text-xl italic text-shadow-2xs">Welcome to our store</p>
            </div>

            {/* Right side, "backdrop-blur"--> glass look ekk */}
            <div className="w-[50%] h-full flex justify-center items-center">

                <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center">

                    <h1 className="text-[40px] font-bold mb-[20px] text-golden text-shadow-white">Login</h1>

{/* Login form eka*/}
{/*...User karana hama detama ex; click, hover, type.. one deyk "event" kiyla kiynwa..."onChange" eken event eke info tika gnna puluwn ".target.value" prints events*/}
                    <input
                        onChange={
                            (e) =>{
                                setEmail(e.target.value);
                            }    
                        } 
                        type="email" placeholder="Enter your Email" 
                        className="w-[80%] h-[50px] mb-[20px] rounded-lg border-[2px] border-golden pl-[10px] text-primary text-lg outline-none focus:border-accent transition-all"
                    />

                    <input 
                        onChange={
                            (e) =>{
                                setPassword(e.target.value);
                            }    
                        } 
                        type="password" placeholder="Password" 
                        className="w-[80%] h-[50px] mb-[20px] rounded-lg border-[2px] border-golden pl-[10px] text-primary text-lg outline-none focus:border-accent transition-all"
                    />

                    <button 
                        onClick={login}
                        className="w-[80%] h-[50px] bg-golden text-white text-xl font-bold rounded-lg hover:bg-accent transition-all mb-[20px]">
                        Login
                    </button>

                    <p className="text-white mb-[10px] mt-[20px] ">           
                        Don't have an account? 
                        <span className="text-golden font-bold cursor-pointer">
                            <Link to="/register">Register</Link>
                        </span>
                    </p>

                    <p className="text-white w-full text-center">
                        Forgot Password? 
                        <span className="text-golden font-bold cursor-pointer">
                            <Link to="/forgot-password">Reset Password</Link>
                        </span>
                    </p> 

                </div>
            </div>
        </div>
    )
}