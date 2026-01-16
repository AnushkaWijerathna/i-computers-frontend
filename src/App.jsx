import './App.css'
import ProductCard from './components/productCard.jsx'

function App() {

  return (
    <>
      <ProductCard name="Laptop"  price="150,000.00" image= "https://picsum.photos/id/2/367/267"></ProductCard>

      <ProductCard name="Phone"  price="90,000.00" image= "https://picsum.photos/id/160/367/267"></ProductCard>
    
    </>
  )
}

export default App
