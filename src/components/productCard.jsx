//Introducing a new tag/ component

import { Link } from "react-router-dom"


//App.jsx eke call krna function ekedi dala ewana data tika function ekta gnne "props" kiyna parameter eken 
export default function ProductCard(props) {

    const product = props.product
    
    return (
        //loku kotuwak hadannwa...eka athule podi kotu hadagena item data danwa...images 2k pennanna hadanne hover krddi
        <div className="w-[300px] h-[400px] m-[30px] cursor-pointer relative 
            bg-white rounded-2xl shadow-md 
            hover:shadow-2xl hover:-translate-y-2 
            transition-all duration-300 ease-out 
            border border-gray-200 
            hover:[&_.button]:opacity-100 
            hover:[&_.primary-image]:opacity-0">
                
            <div className="w-full h-[250px] relative">
                <img 
                    src={product.images[1]}
                    className="w-full h-full absolute bg-white object-contain"
                />
                <img 
                    src={product.images[0]}
                    className="w-full h-full absolute bg-white hover:opacity-0 transition-opacity duration-300 object-contain primary-image"
                />
            </div>
            
            <div className="w-full h-[150px] p-[10px] flex flex-col justify-between bg-white">
                <h1 className="text-center text-lg">{product.name}</h1>
                
                <div className="flex flex-col items-center justify-center">
                    {
                        product.labelledPrice > product.price &&
                        <>
                            <h2 className="text-secondary/80 line-through decoration-golden/70 decoration-2 mr-2">
                                LKR.{product.labelledPrice.toFixed(2)} {/*toFixed() awashya decimal points gana */}
                            </h2>

                            <h2 className="text-xl font-semibold text-secondary/80 decoration-golden/70 decoration-2 mr-2">
                                LKR.{product.price.toFixed(2)} 
                            </h2>
                        </>
                    }
                </div>
            </div>

            <div className="w-full h-[150px] bottom-0 absolute button opacity-0 bg-white flex flex-row gap-4 justify-center transition-opacity duration-300">
                <Link to={"/overview/" + product.productID} className="px-3 h-[50px] py-2.5 border-2 border-accent text-black font-semibold rounded-lg hover:bg-accent hover:text-white transition-colors duration-200 mt-[30px]">
                    View Details
                </Link>
            </div>
        </div>
    )
}

