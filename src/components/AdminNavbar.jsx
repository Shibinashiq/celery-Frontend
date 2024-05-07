import React from 'react';
import { Outlet ,Link, useNavigate } from 'react-router-dom';
import { Navbar as NextNavbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import AddProduct from './Addproduct';

function AdminNavbar() {
    const navigate=useNavigate()
  
  
  return (
    <div className=' min-h-[100vh] ' >
      <NextNavbar shouldHideOnScroll>
        <NavbarBrand>

        <p className="font-bold text-inherit">LACCOAdmin</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <button color="foreground" >
              <AddProduct />
            </button>
          </NavbarItem>
          <NavbarItem isActive>
          
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to="/admin/OrdersAdmin">
            Orders
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          
         
        </NavbarContent>
      </NextNavbar>
      <div>
        <Outlet />

      </div>
    </div>
  );
}

export default AdminNavbar;
