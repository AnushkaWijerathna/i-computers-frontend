//React website eke pennanne meka... api hadna hama functional folder ekkma mekta connect wenna one
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import { Toaster } from "react-hot-toast";
import TestPage from "./pages/test";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPasswordPage from "./pages/forgetPasswordPage";

//448822440174-al792d7stih6m2de06dj1nc8mg0ggjl7.apps.googleusercontent.com //login with google API clientID

//Meka thama web site eka...main eke call krnwa
function App() {
  return (
    //enables routing..."Routes" is a dynamic component, enable routing (Athule thiyna ewa isthira na, path eka anuwa change wenwa, * --> "admin/ "mnwa thbbth admin
    // page eka athulema ee pages load wenna, Toaster-->popup messages display krnna)
    <GoogleOAuthProvider clientId="448822440174-al792d7stih6m2de06dj1nc8mg0ggjl7.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="w-full h-screen bg-primary text-secondary">
          <Routes path="/">
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
