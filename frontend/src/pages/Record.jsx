import { useState, useEffect } from "react";
import axios from "axios";

export default function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch Records
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const res = await axios.get("${import.meta.env.VITE_API_BASE_URL}/records");
    setRecords(res.data);
  };

  // Add Record
  const handleAdd = async () => {
    await axios.post("${import.meta.env.VITE_API_BASE_URL}/records", form);
    setForm({ name: "", email: "", phone: "" });
    fetchRecords();
  };

  // Delete Record
  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/records/${id}`);
    fetchRecords();
  };

  // Update Record
  const handleUpdate = async () => {
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/records/${editingId}`, form);
    setEditingId(null);
    setForm({ name: "", email: "", phone: "" });
    fetchRecords();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Records</h1>

      {/* Form */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded"
        />
        {editingId ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>

      {/* Records Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec._id}>
              <td className="border p-2">{rec.name}</td>
              <td className="border p-2">{rec.email}</td>
              <td className="border p-2">{rec.phone}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => {
                    setForm({
                      name: rec.name,
                      email: rec.email,
                      phone: rec.phone,
                    });
                    setEditingId(rec._id);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rec._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
