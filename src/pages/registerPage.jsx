//Login ekama use krnna
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register() {
    //mula saha aga spaces ain krla name,email.. tika gnnwa (".trim()"), ethkota result eka empty string nm return error
    if (firstname.trim() == "") {
      toast.error("Please Enter First Name");
      return;
    }
    if (lastname.trim() == "") {
      toast.error("Please Enter Last Name");
      return;
    }
    if (email.trim() == "") {
      toast.error("Please Enter Email");
      return;
    }
    if (password.trim() == "") {
      toast.error("Please Enter Password");
      return;
    }
    if (confirmPassword.trim() == "") {
      toast.error("Please confirm your password");
      return;
    }
    if (password != confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    //If everything is correct when register button is clicked, then;
    setIsLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/", {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      console.log();
      navigate("/login");

      toast.success("Register Successful");
      setIsLoading(false);
    } catch (error) {
      toast.error("Register Failed");
      console.log("Error while Registering");
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex relative after:absolute after:inset-0 after:bg-black/10 after:pointer-events-none">
      {/* Left side, "object-cover" image thibba whdta thiyenwa wens wen na*/}
      <div className="w-[50%] h-full flex flex-col p-[60px] justify-center items-center relative z-10">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[200px] h-[200px] object-cover drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]"
        />
        <h1 className="text-[48px] font-extrabold text-golden text-center tracking-wide drop-shadow-lg">
          Plug In Power Up Play Hard
        </h1>
        <p className="text-xl text-white/80 italic mt-2 tracking-wide">
          Welcome to our store
        </p>
      </div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-3xl flex flex-col justify-center items-center border border-white/20">
          <h1 className="text-[22px] font-semibold mb-6 text-golden tracking-wide drop-shadow-md">
            Register
          </h1>

          {/* Register form eka*/}
          <input
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            placeholder="First Name"
            className="w-[80%] h-[52px] mb-5 rounded-xl bg-transparent border border-gray-500/40 pl-4 text-white text-lg outline-none focus:ring-2 focus:ring-golden hover:ring-2 hover:ring-golden shadow-md hover:shadow-golden transition-all"
          />

          <input
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            placeholder="Last Name"
            className="w-[80%] h-[52px] mb-5 rounded-xl bg-transparent border border-gray-500/40 pl-4 text-white text-lg outline-none focus:ring-2 focus:ring-golden hover:ring-2 hover:ring-golden shadow-md hover:shadow-golden transition-all"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-[80%] h-[52px] mb-5 rounded-xl bg-transparent border border-gray-500/40 pl-4 text-white text-lg outline-none focus:ring-2 focus:ring-golden hover:ring-2 hover:ring-golden shadow-md hover:shadow-golden transition-all"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-[80%] h-[52px] mb-6 rounded-xl bg-transparent border border-gray-500/40 pl-4 text-white text-lg outline-none focus:ring-2 focus:ring-golden hover:ring-2 hover:ring-golden shadow-md hover:shadow-golden transition-all"
          />

          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="w-[80%] h-[52px] mb-6 rounded-xl bg-transparent border border-gray-500/40 pl-4 text-white text-lg outline-none focus:ring-2 focus:ring-golden hover:ring-2 hover:ring-golden shadow-md hover:shadow-golden transition-all"
          />

          <button
            onClick={register}
            className="w-[80%] h-[52px] bg-gradient-to-r from-golden to-yellow-400 text-black text-xl font-bold rounded-xl hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] transition-all duration-300 mb-6 active:scale-95"
          >
            Register
          </button>

          <p className="text-white/80 mb-2 mt-4">
            Already have an account?
            <span className="text-golden font-semibold hover:underline cursor-pointer">
              <Link to="/login"> Login</Link>
            </span>
          </p>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-accent/50 flex items-center justify-center text-5xl text-amber-200 z-50">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}
