//admin products ekenma gnna edit krla
import axios from "axios";
import { useEffect, useState } from "react";

import { MdVerified } from "react-icons/md";

export default function AdminUsersPage() {
  //Products useEffect eke function eken fetch krla setProducts ekta danwa...eka products array ekta dala ee array eke data map function eken adala "th" walta map krnwa
  //mokk hri deyk dispaly krna page ekka aniwaryne useState dekk enwa products,loaded (backend eken data fetch krla organize krala iwrda blnna)

  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //methanadi page eka load weddi eka parak run wenwa backEnd API eken data fetch krala "products[]" set kranwa, delete dunna gmn "loaded"-> false una,
  //apahu run karla API eken data fetch krala modified Products[] load krnnwa, remove deleted products

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full max-h-full flex justify-center p-10 relative bg-primary">
      <div className="w-full max-w-[1300px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="w-full overflow-x-auto">
          {/*Loaded nm wtrak table eka display krnna else (":") loading icon eka display krnna */}
          {loaded ? (
            <table className="min-w-full divide-y divide-gray-200 overflow-y-scroll">
              <thead className="bg-accent">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Images
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    First Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Last Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {users.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={item.Image}
                          className="w-12 h-12 rounded-md object-contain border border-gray-100 shadow-sm"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary">
                        {item.email}{" "}
                        {item.isEmailVerified ? (
                          <MdVerified className="text-blue-500 inline" />
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {item.firstname}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {item.lastname}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {item.role}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {item.isBlock ? "Blocked" : "Active"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <button
                          className="px-3 py-1 bg-accent text-white rounded-md hover:bg-accent/80 "
                          onClick={async () => {
                            await axios.put(
                              import.meta.env.VITE_BACKEND_URL +
                                `/users/toggleBlock/${item.email}`,
                              {
                                isBlock: !item.isBlock,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                              },
                            );
                            setLoaded(false);
                          }}
                        >
                          {item.isBlock ? "Unblock User" : "Block User"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
}
