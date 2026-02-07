import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import TestPage from "./test";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckOutPage from "./checkOut";
import OrdersPage from "./ordersPage";
import HomeContents from "./homeContents";
import AboutUs from "./aboutUs";
//Admin, login, register URLs hara one ekk enne home page URL ekata
export default function HomePage() {
  return (
    <div className="w-full h-full max-h-full overflow-y-scroll">
      <Header />
      <div className="w-full min-h-[calc(100%-100px)]">
        <Routes>
          <Route path="/" element={<HomeContents />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/overview/:productID" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkOut" element={<CheckOutPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<h1>Contact Us Page</h1>} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
