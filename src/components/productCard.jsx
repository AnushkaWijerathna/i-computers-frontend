//Introducing a new tag/ component
//App.jsx eke call krna function ekedi dala ewana data tika function ekta gnne "props" kiyna parameter eken 
export default function ProductCard(props) {
    
    return (
        <div>
            <h1>{props.name}</h1>
            <img src = {props.image} />
            <p>Price LKR: {props.price}</p>
        </div>
    )
}