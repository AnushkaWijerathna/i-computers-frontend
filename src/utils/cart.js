//Cart is always an array, which is converted to a string ("[]") inorder to store in the localStorage (which can store data only as String)

import toast from "react-hot-toast"

export function getCart() {
    
    //check if their is a cart in localStorage, no --> store cart array, yes --> String cart[] --> array cart[]
    const cartString = localStorage.getItem("cart")

    if (cartString == null) {
        localStorage.setItem("cart","[]")
        return []
    }

    else{
        const cart = JSON.parse(cartString) 
        return cart
    }
}

export function addToCart(product, quantity) {

     if (!product.productID) {
        console.error("❌ productId missing", product);
        toast.error("Product configuration error");
        return;
    }
    const cart = getCart()

    //check if product is already in the cart, "findIndex()" --> Array eke index check krnwa, condition ekata matching nm eyawa "index" ekt set krnwa 
    //index is -1 if, the productID of the new product is not available inside the cart[]

    const index = cart.findIndex(
        (item) => {
            return  item.productID === product.productID
        }
    )
    
    if (index == -1) {
        cart.push({
            productID : product.productID,
            name : product.name,
            price : product.price,
            labelledPrice : product.labelledPrice,
            quantity : quantity,
            image: product.images[0]
        })

        toast.success(`${product.name} added succesfully`)
    }

    else{
        const newQty = cart[index].quantity + quantity

        //aluthen apu product quantity ekth add krata passeth qty<0, remove that product...if not replace current qty from the updated qty, 

        if (newQty <= 0) {
            cart.splice(index,1)
            toast.success(`${product.name} removed succesfully`)
        }
        else{
            cart[index].quantity = newQty 
            toast.success(`Updated ${product.name} quantity to ${newQty}`)
        }   
    }

    // then save whatever the final "cart" is as a string in LS

    const cartString = JSON.stringify(cart)
    localStorage.setItem("cart",cartString) 

}

export function emptyCart() {

    localStorage.setItem("cart","[]")
}

export function getTotalCart() {

    let total = 0
    const cart = getCart()

    cart.forEach(
        (item) => {
            total +=item.price*item.quantity      
    });

    return total.toFixed(2);
}