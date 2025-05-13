import React, { useEffect, useState } from "react";
import { fetchInventory } from "../api/inventoryAPI";

export default function InventoryList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInventory = async () => {
    try {
      const response = await fetchInventory();
      console.log("Fetched inventory data:", response);
      setPrescriptions(response.data); // Set array only
    } catch (error) {
      console.error("Failed to load inventory.", error);
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
      ) : prescriptions.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Date of Prescription</th>
              <th>Inscription</th>
              <th>Instructions</th>
              <th>Doctor Information</th> 
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription._id}>
                <td>{prescription.name}</td>
                <td>{prescription.age}</td>
                <td>{prescription.gender}</td>
                <td>{prescription.dateOfPrescription || "N/A"}</td>
                <td>
                  {Array.isArray(prescription.inscription) && prescription.inscription.length > 0 ? (
                    <ul>
                      {prescription.inscription.map((med, idx) => (
                        <li key={idx}>
                          {med.name} - {med.dosage}, {med.frequency}x/day, Qty: {med.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{prescription.instructions}</td>
                <td>{prescription.doctorInformation}</td>       
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}