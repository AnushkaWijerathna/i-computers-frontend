//adminProductPage ekama use krnna products wenuwat orders danna
import axios from "axios";
import { useEffect, useState } from "react";
import ViewOrderInfo from "../../components/viewOrderInfo";

export default function AdminOrdersPage() {

    const[orders,setOrders] = useState([]);
    const[loaded,setLoaded] = useState(false);

    const token = localStorage.getItem("token")

    useEffect( 
        () =>{ 

            if (!loaded) {
                
                axios.get(import.meta.env.VITE_BACKEND_URL + "/orders",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                .then(
                    (response) =>{
                        
                        console.log(response.data)
                        setOrders(response.data) 
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
                
                {loaded ?   
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[var(--color-accent)]">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    OrderID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Customer Email
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Customer Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Total Amount
                                </th>          
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Actions
                                </th> 
                            </tr>
                        </thead>

            <tbody className="bg-white divide-y divide-gray-100">

                    {   
                        orders.map(
                            (order,index) => {
                                return(
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[var(--color-secondary)]">
                                            {order.orderID}
                                        </td>

                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[var(--color-secondary)]">
                                            {order.email}
                                        </td>

                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[var(--color-secondary)]">
                                            {order.name}
                                        </td>

                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[var(--color-secondary)]">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>                                        

                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[var(--color-secondary)]">
                                            {order.status}
                                        </td>

                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[var(--color-secondary)]">
                                            LKR: {order.total.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[var(--color-secondary)]">
                                           <ViewOrderInfo order={order}/>
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
    </div>
   )
}       