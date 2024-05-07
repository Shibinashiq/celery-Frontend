import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link } from "@nextui-org/react";
import useAxios from "../axios";
import jsPDF from "jspdf";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axiosInstance.get("User/orders/")
      .then(response => {
        console.log("User's orders:", response.data);
        setOrders(response.data); 
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }

  const downloadAllInvoices = () => {
    const doc = new jsPDF();
    orders.forEach((order, orderIndex) => {
      order.order_items.forEach((item, index) => {
        const yPosition = index * 10 + orderIndex * 80 + 10;
        doc.text(`Order: ${order.id}, Product Name: ${item.product_name}`, 10, yPosition);
        doc.text(`Price: ${item.price }`, 10, yPosition + 10);
      });
    });
    doc.save('invoices.pdf');
  };
  
  const localhostBaseUrl = "http://localhost:8000";

  return (
    <>
      {loading ? ( 
        <p>Loading...</p>
      ) : orders.length === 0 ? ( 
        <p className="flex justify-center items-center mt-60 text-xl" >No orders to display</p>
      ) : (
        <Table removeWrapper aria-label="User's order history">
          <TableHeader>
            <TableColumn>User</TableColumn>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Total Price</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.user_username}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
