import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products/")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, []);
  return (
    <div className="w-full h-[calc(100vh-100px)]">
      {!loaded ? (
        <h1>Loading</h1>
      ) : (
        <div
          className="w-full flex justify-center flex-row flex-wrap " /*row ekak wdhta items thiynwa, ida madi unama ilnaga col ekta itmes enwa flex-wrap eken eka krnne*/
        >
          <div className="w-full h-[100px] sticky top-0 z-10 bg-white flex items-center justify-center mb-4 shadow-md">
            <input
              type="text"
              placeholder="Search products..."
              onChange={async (e) => {
                if (e.target.value == "") {
                  setLoaded(false);
                  await axios
                    .get(import.meta.env.VITE_BACKEND_URL + "/products/")
                    .then((response) => {
                      console.log(response.data);
                      setProducts(response.data);
                      setLoaded(true);
                    });
                  setLoaded(true);
                } else {
                  // search

                  await axios
                    .get(
                      import.meta.env.VITE_BACKEND_URL +
                        "/products/search/" +
                        e.target.value,
                    )
                    .then((response) => {
                      console.log(response.data);
                      setProducts(response.data);
                    });
                  setLoaded(true);
                }
              }}
              className="w-1/2 px-4 py-2 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {products.map((item) => {
            return <ProductCard key={item.productID} product={item} />;
          })}
        </div>
      )}
    </div>
  );
}
