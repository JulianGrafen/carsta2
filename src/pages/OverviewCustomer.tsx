import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface DataItem {
  name: string;
  kennzeichen: string;
  artikelnummer: string;
  email: string;
  status: string;
}

export function OverviewCustomer() {
  const [orders, setOrders] = useState<DataItem[]>([]);
  const [localName, setLocalName] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const locationString = location.pathname.toString();
    const regex = /\/overviewcustomer\/([^\/%]+)%20([^\/%]+)/u;
    const match = locationString.match(regex);

    if (match) {
      const firstName = decodeURI(match[1]);
      const lastName = decodeURI(match[2]);
      const fullName = `${firstName} ${lastName}`;
      setLocalName(fullName);

      // Gets the customer orders to display them in the table
      fetch(`http://192.168.2.169:3002/createcustomer/${fullName}`)
        .then((response) => response.json())
        .then((json) => {
          if (Array.isArray(json)) {
            setOrders(json);
          } else {
            setOrders([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setOrders([]);
        });
    }
  }, [location]);

  return (
    <div>
      <h2 className="ml-4">Kunde: {localName}</h2>
      <table className="ml-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Kennzeichen</th>
            <th className="border border-gray-300 px-4 py-2">Artikelnummer</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{order.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.kennzeichen}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.artikelnummer}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
