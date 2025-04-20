import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchItems();
    }
  }, [navigate]);

  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/inventory");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/inventory/${editingId}`
      : `http://localhost:5000/inventory`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({ name: "", quantity: "", description: "" });
      setEditingId(null);
      fetchItems();
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, quantity: item.quantity, description: item.description });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/inventory/${id}`, {
        method: "DELETE",
      });
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>Inventory Management</h1>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      {/* Form Section */}
      <section style={{ marginBottom: "30px" }}>
        <h2>{editingId ? "Edit Item" : "Add New Item"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ marginRight: "10px", width: "30%" }}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            min={1}
            style={{ marginRight: "10px", width: "20%" }}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{ marginRight: "10px", width: "30%" }}
          />
          <button type="submit">{editingId ? "Update" : "Add"}</button>
        </form>
      </section>

      {/* Inventory List */}
      <section>
        <h2>Items</h2>
        {loading ? (
          <p>Loading items...</p>
        ) : items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item._id} style={{ marginBottom: "10px" }}>
                <strong>{item.name}</strong> (Qty: {item.quantity}) — {item.description}
                <button onClick={() => handleEdit(item)} style={{ marginLeft: "10px" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} style={{ marginLeft: "5px" }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No inventory items found.</p>
        )}
      </section>
    </div>
  );
}
