import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import useAxios from "../axios";
import { Link } from "@nextui-org/react";
import jsPDF from "jspdf";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const axiosInstance = useAxios();
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

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
    order.order_items.forEach((item, index) => {
      doc.text(`Product Name: ${item.product_name}`, 10, index * 10 + 10);
      doc.text(`Price: ${item.price_at_purchase}`, 10, index * 10 + 20);
    });
    doc.save('invoice.pdf');
  };

  return (
    <Table removeWrapper aria-label="User's order history">
      <TableHeader>
        <TableColumn>Product Name</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Total Price</TableColumn>
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
                      <img  src={`${localhostBaseUrl}${item.product_image}`} className="w-10 flex flex-row" />
                      {item.product_name}
                    </div>
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <ul>
                {order.order_items.map(item => (
                  <li key={item.product_name}>{item.price_at_purchase}</li>
                ))}
              </ul>
            </TableCell>
            <TableCell>{order.total_price}</TableCell>
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
