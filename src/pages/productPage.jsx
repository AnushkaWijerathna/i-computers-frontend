import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../components/productCard";

export default function ProductPage() {

    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)

    
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
        ,[]);
    return (
    <div className="w-full h-[calc(100vh-100px)]">
        {
            !loaded ? <h1>Loading</h1> :

            <div className="w-full flex justify-center flex-row flex-wrap"/*row ekak wdhta items thiynwa, ida madi unama ilnaga col ekta itmes enwa flex-wrap eken eka krnne*/>
                {
                products.map(
                    (item) => {
                        return (
                           <ProductCard key={item.productID} product={item}/>
                        )
                    }
                )}
                
            </div>
        }
    </div>
    )
}