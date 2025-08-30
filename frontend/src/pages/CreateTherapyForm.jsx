import React, { useState, useEffect } from "react";

const CreateTherapyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    duration: "",
    price: "",
    practitionerId: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // On mount, load practitionerId from localStorage
  useEffect(() => {
    const storedPractitionerId = localStorage.getItem("practitionerId") || "";
    setFormData((prev) => ({ ...prev, practitionerId: storedPractitionerId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation: patientId no longer needed
    if (
      !formData.name ||
      !formData.description ||
      !formData.code ||
      !formData.duration ||
      !formData.practitionerId
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (parseInt(formData.duration) < 1) {
      setError("Duration must be at least 1 minute.");
      return;
    }
    if (formData.price && parseFloat(formData.price) < 0) {
      setError("Price cannot be negative.");
      return;
    }

    try {
      const response = await fetch("/api/therapies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          code: formData.code,
          duration: parseInt(formData.duration),
          price: formData.price ? parseFloat(formData.price) : 0,
          practitionerId: formData.practitionerId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create therapy");
      }
      const data = await response.json();
      setSuccess("Therapy created successfully.");
      setFormData({
        name: "",
        description: "",
        code: "",
        duration: "",
        price: "",
        practitionerId: localStorage.getItem("practitionerId") || "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Therapy</h2>
      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 text-green-700 bg-green-100 rounded">{success}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="code">
            Code <span className="text-red-500">*</span>
          </label>
          <input
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            type="text"
            className="w-full uppercase border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="duration">
            Duration (minutes) <span className="text-red-500">*</span>
          </label>
          <input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            type="number"
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="0.00"
          />
        </div>

        {/* Practitioner ID shown but disabled since it comes from localStorage */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="practitionerId">
            Practitioner ID <span className="text-red-500">*</span>
          </label>
          <input
            id="practitionerId"
            name="practitionerId"
            value={formData.practitionerId}
            readOnly
            disabled
            className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Create Therapy
        </button>
      </form>
    </div>
  );
};

export default CreateTherapyForm;
