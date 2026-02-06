//Login/register component
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState("user");

  useEffect(() => {
    const token = localStorage.getItem("token");
    // TODO: Get user data from backend if there is a token available
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          setUser(null);
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      {user ? (
        <div className="w-[150px] flex flex-row items-center gap-3">
          <img
            src={user.Image}
            referrerPolicy="no-referrer" //google login weddi image pennan nathi ek nisa mehema dnwa
            onError={(e) => (e.currentTarget.src = "/default.png")}
            className="w-[80px] h-[80px] object-cover rounded-full"
          />

          <select
            value={selectedOption}
            className="bg-transparent outline-none text-white"
            onChange={(e) => {
              if (e.target.value === "logout") {
                localStorage.removeItem("token");
                window.location.href = "/";
              } else if (e.target.value === "my-orders") {
                // TODO: Navigate to my orders page
                window.location.href = "/orders";
              }
            }}
          >
            <option value={"user"} className="bg-accent">
              {user.firstname}
            </option>
            <option value={"logout"} className="bg-accent">
              Logout
            </option>
            <option value={"my-orders"} className="bg-accent">
              My Oders
            </option>
          </select>
        </div>
      ) : (
        <div className="w-[150px] flex flex-row">
          <Link
            to="/login"
            className="mx-2 px-4 py-2 bg-white text-accent rounded-full"
          >
            Login
          </Link>{" "}
          <Link
            to="/register"
            className="mx-2 px-4 py-2 bg-white text-accent rounded-full"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
}
