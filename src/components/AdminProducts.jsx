import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import useAxios from "../axios";

const columns = [
  { name: "Title", uid: "title" },
  { name: "Description", uid: "description" },
  { name: "Price", uid: "price" },
  { name: "Quantity Available", uid: "quantity_available" },
  { name: "Image", uid: "image" }, 
];

const AdminProducts = () => {
  const axiosInstance = useAxios();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('Main/showproducts/');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const renderCell = (product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "image":
        return <img src={cellValue} alt="Product" className="object-cover w-40 h-32"  />;
      case "title":
      case "description":
      case "price":
      case "quantity_available":
        return cellValue;
      default:
        return cellValue;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table aria-label="Product table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={products}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AdminProducts;
