import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image as NextUIImage,
} from "@nextui-org/react";
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
        window.alert("Error fetching cart items");
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

  const handleIncrement = async (productId) => {
    console.log(productId);
    try {
      await axiosinstance.post("User/update-cart/", {
        product_id: productId,
        action: 'increment',
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error incrementing cart item:", error);
      window.alert("Not Enough Quantity Available stay with us we will inform soon");
    }
  };

  const handleDecrement = async (productId) => {
    try {
      await axiosinstance.post("User/update-cart/", {
        product_id: productId,
        action: 'decrement',
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error decrementing cart item:", error);
      window.alert("Minimum Quantity One");
    }
  };

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
      window.alert("Error fetching cart items");
    }
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
      doc.setFontSize(12);
      doc.text("Invoice", 10, 10);

      cartItems.forEach((item, index) => {
        doc.text(`Product Name: ${item.product_name}`, 10, index * 30 + 30);
        doc.text(`Amount: ${item.price}`, 10, index * 30 + 40);
      });

      doc.text(`Total Price: ${cartItems.reduce((total, item) => total + item.price, 0)}`, 10, (cartItems.length + 1) * 30 + 30);
      doc.save('invoice.pdf'); 

      setTimeout(() => {
        window.location.href = "/"; 
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      window.alert("Error during checkout");
    }
  };

  const handleDeleteCartItem = async (productId) => {
    try {
      await axiosinstance.post("User/delete-cart-item/", {
        product_id: productId,
      });
      // Refresh cart items after successful deletion
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      window.alert("Error deleting cart item");
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
          <div className="gap-10 grid grid-cols-2 sm:grid-cols-4">
            {cartItems.map((item, index) => (
              <div key={index} onClick={() => openModal(item)} className="flex flex-col items-center">
                <NextUIImage
                  shadow="sm"
                  radius="lg"
                  width="140px"
                  alt={item.quantity}
                  className="object-cover h-44"
                  src={`http://localhost:8000${item.product_image}`}
                />
                <p>{item.product_name}</p>
                <p className="text-default-500">{item.price}</p>
                <div className="flex flex-row justify-between w-32">
                  <button onClick={() => handleDecrement(item.productId)}>
                    <Minus />
                  </button>
                  <p className="text-default-500">{item.quantity}</p>
                  <button onClick={() => handleIncrement(item.productId)}>
                    <Plus />
                  </button>
                </div>
                <div className="mr--10">
                  <Trash2 className="w-5 cursor-pointer" onClick={() => handleDeleteCartItem(item.productId)} />
                </div>
              </div>
            ))}
          </div>
          <div className="fixed bottom-12 right-10 ml-5">
            <Button auto onClick={handleCheckout}>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
