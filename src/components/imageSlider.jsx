import { useState } from "react";

export default function ImageSlider(props) {

    const images = props.images

    const [activeIndex, setActiveIndex] = useState(0) //Images array eke images saren sare wens wenna one nisa hook ek danne...arrya eke index eka wens wenwa, then index ekta adala image eka display wenwa

    return(
        <div className="w-full flex flex-col items-center justify-center">
            <img 
                src={images[activeIndex]}
                className="max-w-[60%] h-[400px] object-contain mb-[30px]"
            /> 

            {/*Image slider*/}
            <div className="w-full h-[100px] flex flex-row justify-center gap-4">
                
                {/*".map" function eken Images array ek loop krgnnwa...index wala inna aywa display krnwa*/}
                {
                    images.map(
                        (image,index) => {
                            return(
                                <div
                                    key={index}
                                    className={
                                        "w-[100px] h-[90px] flex items-center justify-center " +
                                        (activeIndex === index ? "border-2 border-accent rounded-xl" : "")
                                    }
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <img
                                        src={images[index]}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}