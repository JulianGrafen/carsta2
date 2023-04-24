import React from "react";
import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";

interface DataItem {
  name: string;
  kennzeichen: string;
  email: string;
  status: string;
  id: number;
}

export function EditCustomer(item: any) {
  const [data, setData] = useState([]);

  useEffect(() => {
    //Gets the customer data to display it in the table
    fetch("http://localhost:3002/createCustomer")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleDelete = (itemId: number, itemName: string) => {
    window.alert(`Kunde ${itemName} wurde gelöscht.`);
    window.location.reload();
    // Send the request to delete the item with the specified id
    fetch(`http://localhost:3002/createcustomer/${itemId}`, {
      method: "DELETE",
    });
  };
  const handleSubmit = (event: any, updatedData: DataItem[]) => {
    window.alert(`Der Status des Kundenfahzeugs wurde geändert.`);
    window.location.reload();
    event.preventDefault();
    console.log("Click");

    // Update the data in the database
    fetch("http://localhost:3002/createCustomer", {
      method: "POST",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    // Send the updated data via API
    updatedData.forEach((item: DataItem) => {
      const { name, kennzeichen, email, status } = item;
      fetch("http://localhost:3002/customermail", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, kennzeichen, email, status }),
      });
    });
  };

  const handleStatusChange = (item: DataItem, value: string) => {
    item.status = value;
    setData([...data]);
  };
  return (
    <div className="absolute -translate-y-[310px]">
      <Navbar />
      <table className="ml-10  table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wide">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Kennzeichen</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id} className="text-xs text-white">
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.kennzeichen}</td>
              <td className="border px-4 py-2">
                <select
                  value={item.status}
                  onChange={(event) =>
                    handleStatusChange(item, event.target.value)
                  }
                >
                  <option value="Eingeliefert">Eingeliefert</option>
                  <option value="Gecheckt">Gecheckt</option>
                  <option value="Teile bestellt">Teile bestellt</option>
                  <option value="Teile verbaut">Teile verbaut</option>
                  <option value="Fertig zur Abholung">
                    Fertig zur Abholung
                  </option>
                </select>
              </td>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white rounded-lg p-2"
                  onClick={() => handleDelete(item.id, item.name)}
                >
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="ml-10 mt-4 bg-black text-white rounded-lg p-2"
        type="submit"
        onClick={(event) => handleSubmit(event, data)}
      >
        Speichern
      </button>
    </div>
  );
}
