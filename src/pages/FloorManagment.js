import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TableOne from "../Assets/Table.svg";
import TableTwo from "../Assets/Mid.svg";
import AddIcon from "../Assets/Button.base (2).svg";
import MinIcon from "../Assets/Button.base (1).svg";
import Copy from "../Assets/copy.svg";
import Rotate from "../Assets/Number (1).svg";
import Delete from "../Assets/trash.svg";

import Draggable from "react-draggable";

const FloorManagment = () => {
  const [countMin, setCountMin] = useState(0);
  const [countMax, setCountMax] = useState(0);
  const [nextId, setNextId] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });
  const [mount, setMount] = useState(false);

  const incrementMin = () => setCountMin(countMin + 1);
  const decrementMin = () => {
    if (countMin > 0) {
      setCountMin(countMin - 1);
    }
  };

  const incrementMax = () => setCountMax(countMax + 1);
  const decrementMax = () => {
    if (countMax > 0) {
      setCountMax(countMax - 1);
    }
  };

  const toggleSwitch = () => setIsActive(!isActive);

  // State to track positions of all draggable objects
  const [positions, setPositions] = useState({
    box1: { x: 0, y: 0, rotation: 0 },
    box2: { x: 100, y: 100, rotation: 0 },
    box3: { x: -50, y: 50, rotation: 0 },
  });

  // Load positions from localStorage on component mount
  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem("dragPositions"));
    if (savedPositions) setPositions(savedPositions);
  }, []);

  // Save positions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("dragPositions", JSON.stringify(positions));
  }, [positions]);

  // Update position of a specific draggable object
  const handleStop = (id, data) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [id]: { ...prevPositions[id], x: data.x, y: data.y },
    }));
  };
  const handleDelete = (keyToDelete) => {
    setPositions((prevPositions) => {
      const newPositions = { ...prevPositions };
      delete newPositions[keyToDelete];
      return newPositions;
    });
  };

  const handleRotate = (keyToRotate, angle = 45) => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      [keyToRotate]: {
        ...prevPositions[keyToRotate],
        rotation: (prevPositions[keyToRotate]?.rotation || 0) + 45,
      },
    }));
  };
  const handleDuplicate = (key, value) => {
    const newId = `box${Object.keys(positions).length + 1}`;
    setPositions((prevPositions) => ({
      ...prevPositions,
      [newId]: {
        x: value.x + 20,
        y: value.y + 20,
      },
    }));
  };
  const addNewItem = () => {
    const newId = `box${Object.keys(positions).length + 1}`;
    setPositions((prevPositions) => ({
      ...prevPositions,
      [newId]: { x: previousPosition.x, y: previousPosition.y },
    }));
    setNextId((prevId) => prevId + 1); // Increment for the next ID
  };

  console.log("positions", positions);

  const backgroundImage = require("../Assets/Floor.jpg");

  const handleDrag = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Update current position during the drag
    setPreviousPosition({ x: currentPosition.x, y: currentPosition.y });
    setCurrentPosition({ x, y });
  };

  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem("positions"));
    if (savedPositions) {
      setPositions(savedPositions);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("positions", JSON.stringify(positions));
    }, 200);
  }, [positions]);
  return (
    <div>
      <Header />
      <div className="flex ">
        <div className="w-1/6 pt-10 mr-1 bg-white">
          <h2 className="ml-4 font-semibold">Tables</h2>
        </div>
        <div className="w-5/6 pt-10 bg-white">
          <div className="flex flex-row items-center justify-between">
            <h2 className="ml-4 font-semibold">Main Room</h2>
            <div className="flex flex-row gap-2 mb-2 mr-4">
              <button class="flex items-center px-2 py-1 bg-gradient-to-r from-gray-800 to-red-600 hover:from-gray-900 hover:to-red-700 text-white rounded ">
                <img
                  src={AddIcon}
                  alt="AddIcon"
                  className="mr-1 cursor-pointer"
                />
                Add Room
              </button>
              <button class="bg-white border px-2 py-1 text-gray-400 rounded ">
                Save Room
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/6 py-4 mr-1 bg-white">
          <h2 className="text-base font-bold text-center">Table Options</h2>
          <h4 className="text-xs font-semibold text-center text-gray-400">
            Drag and Drop your tables
          </h4>
          <div className="flex flex-row justify-between px-2">
            <div onDragEnd={addNewItem} onDrag={handleDrag}>
              <img
                src={TableOne}
                alt="TableOne"
                className="mt-8 cursor-pointer"
              />
            </div>
            <div onDragEnd={addNewItem} onDrag={handleDrag}>
              <img
                src={TableTwo}
                alt="TableTwo"
                className="mt-8 cursor-pointer"
              />
            </div>
          </div>
          <div className="h-0.5 bg-gray-400 my-8"></div>

          <div className="p-3">
            <h2 className="mb-6 text-base font-bold text-center">
              Table Details
            </h2>
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="name"
                className="text-xs font-medium text-gray-700"
              >
                Table Name:
              </label>
              <input
                id="name"
                type="text"
                className="w-24 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="name"
                className="text-xs font-medium text-gray-700"
              >
                {" "}
                Min Covers:
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={MinIcon}
                  onClick={decrementMin}
                  aria-label="Increase"
                />
                <span className="text-xl font-bold">{countMin}</span>
                <img
                  src={AddIcon}
                  onClick={incrementMin}
                  aria-label="Increase"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="name"
                className="text-xs font-medium text-gray-700"
              >
                {" "}
                Max Covers:
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={MinIcon}
                  onClick={decrementMax}
                  aria-label="Increase"
                />
                <span className="text-xl font-bold">{countMax}</span>
                <img
                  src={AddIcon}
                  onClick={incrementMax}
                  aria-label="Increase"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="text-xs font-medium text-gray-700"
              >
                Online:
              </label>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm font-bold ${
                    isActive ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {isActive ? "Active" : "Inactive"}
                </span>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" />
                  <div
                    onClick={toggleSwitch}
                    class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"
                  ></div>
                </label>
              </div>
            </div>
          </div>
          <div className="h-0.5 bg-gray-400 my-8"></div>
          <div className="flex items-center justify-between p-2 mb-3">
            <label htmlFor="name" className="text-xs font-medium text-gray-700">
              {" "}
              Advance Settings:
            </label>
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-5/6 py-4 "
        >
          <div className="flex items-center justify-center h-screen gap-4">
            {Object.entries(positions).map(([key, value]) => (
              <Draggable
                key={key}
                position={{ x: value.x, y: value.y }}
                onStop={(e, data) => handleStop(key, data)}
              >
                <div className="relative cursor-move group">
                  <img
                    src={TableOne}
                    alt={key}
                    className="mt-8 cursor-pointer"
                    style={{ transform: `rotate(${value.rotation || 0}deg)` }}
                  />
                  <div className="absolute top-0 flex p-2 space-x-4 transition-opacity transform -translate-x-1/2 -translate-y-full rounded-lg shadow-md opacity-0 left-1/2 group-hover:opacity-100">
                    <img
                      src={Rotate}
                      onClick={() => handleRotate(key)}
                      className="cursor-pointer"
                      aria-label="Rotate"
                    />
                    <img
                      src={Copy}
                      onClick={() => handleDuplicate(key, value)}
                      className="cursor-pointer"
                      aria-label="Copy"
                    />
                    <img
                      src={Delete}
                      onClick={() => handleDelete(key)}
                      className="cursor-pointer"
                      aria-label="Delete"
                    />
                  </div>
                </div>
              </Draggable>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorManagment;
