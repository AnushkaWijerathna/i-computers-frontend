import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

    //state hooks hama input field ekkma one value eka store krnna
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

            if (!res.data.token) {
                toast.error("Login Failed");
                return;
            }

            //store token in local storage of the users browser
            localStorage.setItem("token",res.data.token);

            //alert message
            if (res.data.token) {
               toast.success("Login Successful");
            }

            if (res.data.role == "admin") {

                navigate("/admin");

            } 
            else if (res.data.role == "user") {
                navigate("/");
            }
           
        } catch (error) {
            console.error("Login failed:", error ,error.response?.status, error.response?.data || error.message);
            toast.error("Login Failed" );
        }
       
    }

    return(
        <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex relative after:absolute after:inset-0 after:bg-black/20 after:pointer-events-none">
            {/* Left side, "object-cover" image thibba whdta thiyenwa wens wen na*/}
            <div className="w-[50%] h-full flex flex-col p-[60px] justify-center items-center relative z-10">

                <img src="/logo.png" alt="logo" className="w-[200px] h-[200px] object-cover drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]" />
               <h1 className="text-[48px] font-extrabold text-golden text-center tracking-wide drop-shadow-lg">Plug In Power Up Play Hard</h1>
                <p className="text-xl text-white/80 italic mt-2 tracking-wide">Welcome to our store</p>
            </div>

            {/* Right side, "backdrop-blur"--> glass look ekk */}
            <div className="w-[50%] h-full flex justify-center items-center">

                <div className="w-[450px] h-[600px] bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-3xl flex flex-col justify-center items-center border border-white/20">

                    <h1 className="text-[42px] font-extrabold mb-6 text-golden tracking-wide drop-shadow-md">Login</h1>

                    {/* Login form eka*/}
                    {/*...User karana hama detama ex; click, hover, type.. one deyk "event" kiyla kiynwa..."onChange" eken event eke info tika gnna puluwn ".target.value" prints events*/}
                    <input
                        onChange={
                            (e) =>{
                                setEmail(e.target.value);
                            }    
                        } 
                        type="email" placeholder="Enter your Email" 
                       className="w-[80%] h-[52px] mb-5 rounded-xl bg-white/90 border border-transparent pl-4 text-black text-lg outline-none focus:ring-2 focus:ring-golden transition-all shadow-sm"
                    />

                    <input 
                        onChange={
                            (e) =>{
                                setPassword(e.target.value);
                            }    
                        } 
                        type="password" placeholder="Password" 
                        className="w-[80%] h-[52px] mb-6 rounded-xl bg-white/90 border border-transparent pl-4 text-black text-lg outline-none focus:ring-2 focus:ring-golden transition-all shadow-sm"
                    />

                    <button 
                        onClick={login}
                        className="w-[80%] h-[52px] bg-gradient-to-r from-golden to-yellow-400 text-black text-xl font-bold rounded-xl hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] transition-all duration-300 mb-6 active:scale-95">
                        Login
                    </button>

                    <p className="text-white/80 mb-2 mt-4">            
                        Don't have an account? 
                        <span className="text-golden font-semibold hover:underline cursor-pointer">
                            <Link to="/register">Register</Link>
                        </span>
                    </p>

                    <p className="text-white/80 mb-2 mt-4">
                        Forgot Password? 
                        <span className="text-golden font-semibold hover:underline cursor-pointer">
                            <Link to="/forgot-password">Reset Password</Link>
                        </span>
                    </p> 

                </div>
            </div>
        </div>
    )
}