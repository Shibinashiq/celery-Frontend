import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image as NextUIImage,
} from "@nextui-org/react";
import axios from "axios";
import useAxios from "../axios";
import { useSelector } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import jsPDF from 'jspdf'; 

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const userId = useSelector((state) => state.userId || "");
  const axiosinstance = useAxios();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosinstance.get(`User/cart-items/${userId}/`);
        const cartItemsWithProductId = response.data.map((cartItem) => ({
          ...cartItem,
          productId: cartItem.product,
        }));
        setCartItems(cartItemsWithProductId);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const handleCheckout = async () => {
    try {
      const cartData = cartItems.map(item => ({
        product_id: item.productId,
        quantity: item.quantity
      }));

      await axiosinstance.post("User/checkout/", { cart_items: cartData }); 
      console.log("Checkout successful");

      const doc = new jsPDF();
      cartItems.forEach((item, index) => {
        doc.text(`Product Name: ${item.product_name}`, 10, index * 10 + 10);
        doc.text(`Price: ${item.price}`, 10, index * 10 + 20);
      });
      doc.save('invoice.pdf'); 

      setTimeout(() => {
        window.location.href = "/"; 
      });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>

      {cartItems.length === 0 ? (
        <div className="justify-center items-center flex m-52">
          <h1 className="text-xl text-red-50">Cart is empty</h1>
        </div>
      ) : (
        <div>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {cartItems.map((item, index) => (
              <div key={index} onClick={() => openModal(item)}>
                <NextUIImage
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.quantity}
                  className="w-full object-cover h-[140px]"
                  src={`http://localhost:8000${item.product_image}`}
                />
                <p>{item.product_name}</p>
                <p className="text-default-500">{item.price}</p>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-6">
                    <button onClick={() => handleIncrement(item.product)}>
                      <Plus />
                    </button>
                    <p className="text-default-500">{item.quantity}</p>
                    <button onClick={() => handleDecrement(item.product)}>
                      <Minus />
                    </button>
                  </div>
                  <div>
                    <Trash2 onClick={() => handleDeleteCartItem(item.product)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div  className="fixed bottom-12 right-10 ml-5 ">
            <Button auto onClick={handleCheckout}>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
