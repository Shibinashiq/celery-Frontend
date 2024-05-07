import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import useAxios from "../axios";
import { Link } from "@nextui-org/react";
import jsPDF from "jspdf";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axiosInstance.get("User/orders/")
      .then(response => {
        console.log("User's orders:", response.data);
        setOrders(response.data); 
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }

  const localhostBaseUrl = "http://localhost:8000";
  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("AQUA INDIA ORDER INVOICE", 10, 10);
  
    order.order_items.forEach((item, index) => {
      doc.text(`Product Name: ${item.product_name}`, 10, index * 30 + 30);
      doc.text(`Amount: ${item.price_at_purchase}`, 10, index * 30 + 40);
    });
  
    doc.text(`Total Price: ${order.total_price}`, 10, (order.order_items.length + 1) * 30 + 30);
    doc.save("invoice.pdf");
  };
  
  return (
    <Table removeWrapper aria-label="User's order history">
      <TableHeader>
        <TableColumn>Product Name</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id}>
            <TableCell>
              <ul>
                {order.order_items.map(item => (
                  <li key={item.product_name}>
                    <div className="flex flex-row gap-5 mb-3 mt-3">
                      <img src={`${localhostBaseUrl}${item.product_image}`} className="w-10 flex flex-row" />
                      <div>
                        <div>{item.product_name}</div>
                        <div>{item.price_at_purchase}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>
              <Link underline="hover" className="cursor-pointer" onClick={() => downloadInvoice(order)}>Download Invoice</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
