import Home from "./pages/home/Home"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AccountType from "./pages/accountType/AccountType"
import BusinessRegister from "./pages/businessRegister/BusinessRegister"
import BusinessLogin  from "./pages/businessLogin/BusinessLogin"
import AllStores from "./pages/allStores/AllStores"
import StoreProfile from "./pages/storeProfile/StoreProfile"
import { useState } from "react"
import Cart from "./components/cart/Cart"
import Topbar from "./components/topbar/Topbar"
import CheckOut from "./pages/checkout/CheckOut"
import MobileTopBar from "./components/mobileTopBar/MobileTopBar"




function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen,setMobileOpen] = useState(false)
  

  return (
    <div className="app">
      <BrowserRouter>
      <Topbar cartOpen={cartOpen} setCartOpen={setCartOpen} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
         <MobileTopBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
        <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/accounts" element={<AccountType/>}/>
          <Route path="/userAuth" element={<Login/>}/>
          <Route path="/createStore" element={<BusinessRegister/>}/>
          <Route path="/storeAuth" element={<BusinessLogin/>}/>
          <Route path="/userRegister" element={<Register/>}/>
          <Route path="/stores" element={<AllStores/>}/>
          <Route path="/store/:id" element={<StoreProfile/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App
