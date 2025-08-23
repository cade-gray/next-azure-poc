"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [weights, setWeights] = useState([]);
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Load weights on component mount
  useEffect(() => {
    loadWeights();
  }, []);

  const loadWeights = async () => {
    try {
      const response = await fetch("/api/weights");
      const data = await response.json();
      setWeights(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading weights:", error);
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!date || !value) {
      alert("Please fill in both date and weight");
      return;
    }

    try {
      const response = await fetch("/api/weights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, value }),
      });

      if (response.ok) {
        setDate("");
        setValue("");
        loadWeights(); // Refresh the list
      } else {
        alert("Error adding weight");
      }
    } catch (error) {
      console.error("Error adding weight:", error);
      alert("Error adding weight");
    }
  };

  const handleDelete = async (targetDate) => {
    try {
      const response = await fetch("/api/weights", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: targetDate }),
      });

      if (response.ok) {
        loadWeights(); // Refresh the list
      } else {
        alert("Error deleting weight");
      }
    } catch (error) {
      console.error("Error deleting weight:", error);
      alert("Error deleting weight");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <header>
        <h1 className="text-4xl font-bold mb-2">
          &quot;API Demo&quot; - Just pulling from file hosted with project
          <br />
          This page is a client component
          <br />
          Also vibe coded (I feel gross)
        </h1>
        <h2 className="text-2xl font-bold mb-6">Weight Measured</h2>
      </header>
      <main>
        {/* Add Weight Form */}
        <form
          onSubmit={handleAdd}
          className="mb-8 p-4 border rounded-lg bg-gray-500"
        >
          <h3 className="text-lg font-semibold mb-4">Add New Weight</h3>
          <div className="flex gap-4 items-end">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date (MM-DD-YYYY)
              </label>
              <input
                type="text"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="01-15-2024"
                pattern="\d{2}-\d{2}-\d{4}"
                className="border rounded px-3 py-2 w-32"
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium mb-1"
              >
                Weight
              </label>
              <input
                type="number"
                id="weight"
                step="0.1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="150.5"
                className="border rounded px-3 py-2 w-24"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>

        {/* Weights List */}
        <ul className="space-y-2">
          {weights.map((weight) => (
            <li
              key={weight.id}
              className="flex justify-between items-center p-3 border rounded-lg bg-gray-500"
            >
              <span className="font-medium">
                {weight.date}: {weight.value}
              </span>
              <button
                onClick={() => handleDelete(weight.date)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {weights.length === 0 && (
          <p className="text-gray-900 text-center py-8">
            No weights recorded yet.
          </p>
        )}
      </main>
    </div>
  );
}
