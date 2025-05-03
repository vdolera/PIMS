import React, { useEffect, useState } from "react";
import { fetchInventory } from "../api/inventoryAPI"; 
export default function InventoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInventory = async () => {
    try {
      const data = await fetchInventory();
      setItems(data);
    } catch (error) {
      console.error("Failed to load inventory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Medicine ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Dosage Form</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiration Date</th>
            <th>Prescription Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.medicineId}</td>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.dosageForm}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
              <td>{item.prescriptionRequired ? "Yes" : "No"}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
    </div>
  );
}
