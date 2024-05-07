import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import useAxios from "../axios";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("Main/showproducts/");
        setProducts(response.data);
      } catch (error) {
        window.alert("Error fetching products:");
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };
  const addToCart = (product_id) => {
    axiosInstance.post("User/add-to-cart/", { product_id })
      .then((response) => {
        // window.alert("Product added to cart");
      })
      .catch((error) => {
        window.alert("The product is already exist");
      });
  };


  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex justify-center object-cover mt-1">
      <div className=" gap-10  grid grid-cols-12 grid-rows-2 px-8 mb-3">
        {products.map((product, index) => (
          <Card
            key={index}
            className={`col-span-12 sm:col-span-${
              index === 3 ? "5" : "4"
            } h-${index === 3 || index === 4 ? "300px" : "auto"}`}
          >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                {product.title}
              </p>
              <Button
                variant="light"
                size="sm"
                onClick={() => openModal(product)}
                className="text-white font-medium text-small cursor-pointer"
                auto
              >
                View
              </Button>
              <Button variant="light" size="sm"
                onClick={() => addToCart(product.id)} 
                className="text-white font-medium text-small cursor-pointer"
                auto
              >
                Add to cart
              </Button>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-44 object-cover"
              src={product.image}
            />
          </Card>
        ))}
      </div>
      {selectedProduct && (
        <Modal
          isOpen={selectedProduct !== null}
          onOpenChange={closeModal}
          backdrop="opaque"
          className="dark text-white"
        >
          <ModalContent >
            <ModalHeader>Product Details</ModalHeader>
            <ModalBody>
              <Image
                removeWrapper
                alt={selectedProduct.title}
                className="w-full h-auto object-cover"
                src={selectedProduct.image}
              />
              <p>{selectedProduct.title}</p>
              <p>{selectedProduct.description}</p>
              <p>Price: {selectedProduct.price}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="foreground" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
