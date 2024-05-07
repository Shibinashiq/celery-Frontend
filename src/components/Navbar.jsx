import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { GripVertical, ShoppingCart } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import useAxios from "../axios";

function Navbar() {
  const navigate = useNavigate();
  const order = () => {
    navigate("/orders");
  };
  

// const axiosinstance =useAxios()
//   function handleOrdersClick() {
//     axiosinstance.get("User/orders/")
//       .then(response => {
//         console.log("User's orders:", response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching orders:", error);
//       });
//   }
  

  return (
    <div className="min-h-[100vh]">
      <NextNavbar shouldHideOnScroll>
        <NavbarBrand>
          <p className="font-bold text-inherit">LACCO</p>
        </NavbarBrand>
        <NavbarContent>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              <NavbarItem>
                <Link color="foreground" to="/">
                  Home
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="#" aria-current="page">
                  Customers
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="#">
                  Integrations
                </Link>
              </NavbarItem>
            </div>
            <div className="flex gap-4 items-center">
              <NavbarItem className="hidden lg:flex">
                <Link to="/login">Login</Link>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
                <Link to="/Signup">Signup</Link>
              </NavbarItem>
              <NavbarItem>
                <Link to="/cart">
                  <ShoppingCart />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Dropdown>
                  <DropdownTrigger>
                    <GripVertical />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new " onClick={order}>Orders</DropdownItem>
                  
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </div>
          </div>
        </NavbarContent>
      </NextNavbar>
      <Outlet />
    </div>
  );
}

export default Navbar;
