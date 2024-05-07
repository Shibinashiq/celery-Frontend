import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Input } from "@nextui-org/react";
import useAxios from "../axios";

export default function AddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axiosInstance = useAxios();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity_available: "",
    image: null, // Initialize image state
  });

  const [image, setImage] = useState(null); // Define image state

  const handleOpen = () => {
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImage(file); 
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity_available", formData.quantity_available);
      formDataToSend.append("image", formData.image);
      
      const response = await axiosInstance.post("http://localhost:8000/Main/addproducts/", formDataToSend, {});
  
      if  (response.status === 200 || response.status === 201) {
        console.log("Product added successfully");
        onClose(); // Close the modal
        setFormData({ // Reset form data
          title: "",
          description: "",
          price: "",
          quantity_available: "",
          image: null,
        });
        setImage(null); // Reset image state
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while adding product:", error);
    }
  };
  
  
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Link variant="faded" onClick={handleOpen}>Add Product</Link>
      </div>
      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add Product</ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Input
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <Input
              label="Quantity Available"
              name="quantity_available"
              type="number"
              value={formData.quantity_available}
              onChange={handleChange}
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            {image && (
              <div>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  style={{ maxWidth: "70%", height: "50%" }}
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Add Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
