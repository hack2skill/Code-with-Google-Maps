import React, { useState, useEffect } from "react";

const Inventory = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newItem, setNewItem] = useState({
    chemicalName: "",
    weight: "",
    location1: "",
    location2: "",
    // location3: "",
    docsURL: "",
    location_info: {
      lat: "",
      lon: "",
    },
  });

  const fetchInventoryData = () => {
    fetch("http://localhost:5000/inventory/all")
      .then((response) => response.json())
      .then((data) => {
        setInventoryItems(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  };
  useEffect(() => {
    fetchInventoryData();
  }, []);
  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAddItem = () => {
    if (
      newItem.chemicalName &&
      newItem.weight &&
      newItem.location1 &&
      newItem.location2 &&
      // newItem.location3 &&
      newItem.docsURL &&
      newItem.location_info.lat &&
      newItem.location_info.lon
    ) {
      // Prepare the request body object
      const requestBody = {
        chemicalname: newItem.chemicalName,
        weight: parseFloat(newItem.weight), // Convert weight to a number
        storehouse1: newItem.location1,
        storehouse2: newItem.location2,
        location_info: {
          lat: parseFloat(newItem.location_info.lat), // Convert lat to a number
          lon: parseFloat(newItem.location_info.lon), // Convert lon to a number
        },
      };

      // Make the POST request
      fetch("http://localhost:5000/inventory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Item added successfully:", data);
          // You can update your UI or take other actions here
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
      setInventoryItems([...inventoryItems, newItem]);

      setNewItem({
        chemicalName: "",
        weight: "",
        location1: "",
        location2: "",
        // location3: "",
        docsURL: "",
        location_info: {
          lat: "",
          lon: "",
        },
      });
      console.log(newItem);
      setIsFormVisible(false);
    } else {
      console.log("Error in setting");
    }
  };

  return (
    <div>
      <div className="grey-box pt-1 h-[80vh] mb-10 overflow-y-scroll">
        <div className="flex justify-between mx-10 my-5">
          <div className="opacity-80 text-black text-2xl font-semibold">
            Your Inventory
          </div>
          <div
            className="icon cursor-pointer border border-gray-400 rounded-full px-3 py-1"
            onClick={handleFormToggle}
          >
            <div className="relative text-3xl pb-2 px-1">+</div>
          </div>
        </div>
        <br />
        <div className="mx-10 ">
          {inventoryItems.map((item, index) => (
            <div
              key={index}
              className="inventory-card bg-[#e5e5e5] mb-4 px-4 py-4 rounded-xl"
            >
              <div className="flex justify-between">
                <div className="rightdiv">
                  <div className="flex  ">
                    {" "}
                    <h3 className="text-zinc-700 text-2xl font-semibold font-['SF Pro Display' mr-2">
                      {item.chemicalname}.
                    </h3>
                    <p className="text-blue-950 text-lg font-semibold font-['SF Pro Display'] my-auto">
                      {" "}
                      {item.weight}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="icon mr-3">
                      <img src="" alt="store" />
                    </div>
                    <p className="text-neutral-500 text-base font-medium font-['SF Pro Display'] my-auto">
                      Store Room -
                    </p>
                    <p className="text-zinc-800 text-lg font-semibold ml-2 ">
                      {" "}
                      {item.location1}
                    </p>
                  </div>

                  {/* <p>Location 2: {item.location2}</p>
              <p>Location 3: {item.location3}</p> */}

                  <div className="w-80 -ml-1 mt-6 h-8 justify-start items-start gap-4 inline-flex">
                    <div className="h-8 px-6 py-1.5 bg-green-700 rounded-2xl justify-between items-center flex">
                      <div className="text-white text-sm font-medium font-['SF Pro Display']">
                        Voltatile
                      </div>
                    </div>
                    <div className="h-8 px-6 py-1.5 bg-yellow-600 rounded-2xl justify-between items-center flex">
                      <div className="text-white text-sm font-medium font-['SF Pro Display']">
                        Explosive
                      </div>
                    </div>
                    <div className="h-8 px-6 py-1.5 bg-red-700 rounded-2xl justify-between items-center flex">
                      <div className="text-white text-sm font-medium font-['SF Pro Display']">
                        Flammable
                      </div>
                    </div>
                  </div>
                </div>

                <div className="leftdiv flex flex-col">
                  <div className="h-7 py-1 border-b border-red-800">
                    <div className="text-red-800 text-base font-medium font-['SF Pro Display']">
                      View Emergency Handling Procedure
                    </div>
                  </div>
                  <div className="flex">
                    <div className="h-12 px-8 py-3.5 bg-gradient-to-b from-neutral-700 to-black rounded-lg mt-10">
                      <div className="text-white text-base font-medium font-['SF Pro Display']">
                        View Docs
                      </div>
                    </div>
                    <div className="h-12 px-8 py-3 rounded-lg border border-neutral-600 justify-start items-center gap-2 inline-flex ml-4 mt-10">
                      <div className="w-5 h-5 relative" />
                      <div className="text-zinc-800 text-base font-medium font-['SF Pro Display']">
                        Edit details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <p>Docs URL: {item.docsURL}</p> */}
            </div>
          ))}
        </div>
      </div>

      {/* Conditionally render the form */}
      {isFormVisible && (
        <InventoryForm
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
        />
      )}

      {/* Render inventory items as cards */}
    </div>
  );
};

const InventoryForm = ({ newItem, setNewItem, handleAddItem }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      location_info: {
        ...newItem.location_info,
        [name]: value,
      },
    });
  };

  return (
    <div className="popup-form">
      <h2 className="text-2xl font-semibold">Add Inventory Item</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Chemical Name
          </label>
          <select
            name="chemicalName" // Add name attribute
            value={newItem.chemicalName} // Set value from state
            onChange={handleChange} // Handle change event
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Chemical Name</option>
            <option value="Hydrogen">Hydrogen</option>
            <option value="Methane">Methane</option>
            <option value="Ethane">Ethane</option>
            <option value="Propane">Propane</option>
            <option value="Butane">Butane</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Kerosene">Kerosene</option>
            <option value="Diesel">Diesel</option>
            <option value="NaturalGas">Natural Gas</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Weight
          </label>
          <input
            type="text"
            name="weight" // Add name attribute
            value={newItem.weight} // Set value from state
            onChange={handleChange} // Handle change event
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Weight"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location 1
          </label>
          <input
            type="text"
            name="location1" // Add name attribute
            value={newItem.location1} // Set value from state
            onChange={handleChange} // Handle change event
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Location 1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location 2
          </label>
          <input
            type="text"
            name="location2" // Add name attribute
            value={newItem.location2} // Set value from state
            onChange={handleChange} // Handle change event
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Location 2"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location 3
          </label>
          <input
            type="text"
            name="location3" // Add name attribute
            value={newItem.location3} // Set value from state
            onChange={handleChange} // Handle change event
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Location 3"
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Docs URL
          </label>
          <input
            type="text"
            name="docsURL" // Add name attribute
            value={newItem.docsURL} // Set value from state
            onChange={handleChange} // Handle change event
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Docs URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Latitude (lat)
          </label>
          <input
            type="text"
            name="lat"
            value={newItem.location_info.lat}
            onChange={handleLocationChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Latitude"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Longitude (lon)
          </label>
          <input
            type="text"
            name="lon"
            value={newItem.location_info.lon}
            onChange={handleLocationChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Longitude"
          />
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inventory;
