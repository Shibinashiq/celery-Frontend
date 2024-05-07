import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminNavbar from "./components/AdminNavbar";
import AdminProducts from "./components/AdminProducts";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import OrdersAdmin from "./components/OrdersAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route path="Orders" element={<Orders />} />
      </Route>

      <Route path="/admin" element={<AdminNavbar />}>
        <Route index element={<AdminProducts />} />
        <Route path="OrdersAdmin"element={<OrdersAdmin />} />
       
      </Route>

    </Routes>
  );
}

export default App;
