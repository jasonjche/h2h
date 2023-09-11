"use client";

import { useState } from "react";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [namesList, setNamesList] = useState([]);
  const [compareIndex, setCompareIndex] = useState(null);
  const [newItem, setNewItem] = useState(null);

  const insertSorted = (arr, item) => {
    let low = 0,
      high = arr.length;

    while (low < high) {
      const mid = (low + high) >>> 1;
      if (arr[mid] < item) low = mid + 1;
      else high = mid;
    }

    arr.splice(low, 0, item);
  };

  const handleUserPreference = (preferred) => {
    if (preferred === newItem) {
      // Insert newItem at the current compareIndex
      namesList.splice(compareIndex, 0, newItem);
      setNamesList([...namesList]);
      setNewItem(null);
      setCompareIndex(null);
    } else {
      // Continue searching for the correct position
      if (compareIndex < namesList.length - 1) {
        setCompareIndex(compareIndex + 1);
      } else {
        // Reached the end, insert at the last position
        setNamesList([...namesList, newItem]);
        setNewItem(null);
        setCompareIndex(null);
      }
    }
  };

  const handleAddEntry = () => {
    if (namesList.length === 0) {
      setNamesList([searchTerm]);
      setSearchTerm("");
      return;
    }

    setNewItem(searchTerm);
    setSearchTerm("");
    setCompareIndex(0);
  };

  const getRankColor = (index) => {
    const total = namesList.length;
    const topThird = Math.ceil(total / 3);
    const middleThird = Math.ceil((2 * total) / 3);
    if (index < topThird) return "bg-green-500";
    if (index < middleThird) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-4xl font-extrabold text-black">Rave Ranker</h1>
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          placeholder="Enter a name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={handleAddEntry}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Add Artist
        </button>
      </div>
      <div className="mt-8">
        {namesList.map((item, index) => (
          <div
            key={index}
            className="flex items-center mb-4 p-4 rounded-lg shadow-lg bg-gray-200"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getRankColor(
                index
              )}`}
            >
              {index + 1}
            </div>
            <p className="ml-4 text-xl font-medium text-black">{item}</p>
          </div>
        ))}
      </div>
      {compareIndex !== null && (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow-lg">
          <h2 className="text-2xl font-extrabold mb-4">
            Which one do you prefer?
          </h2>
          <div className="flex justify-around">
            <button
              onClick={() => handleUserPreference(namesList[compareIndex])}
              className="bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded focus:border-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              {namesList[compareIndex]}
            </button>
            <span className="text-xl font-bold mx-4">OR</span>
            <button
              onClick={() => handleUserPreference(newItem)}
              className="bg-green-500 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded focus:border-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
              {newItem}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
