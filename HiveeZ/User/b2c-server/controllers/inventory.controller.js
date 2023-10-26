// Import the ChemicalInventory model
const ChemicalInventory = require("../model/inventory.model");

// Controller function to add a new chemical inventory item
exports.addChemicalInventory = async (req, res) => {
  try {
    const { chemicalname, weight, storehouse1, storehouse2, location_info } =
      req.body;

    // Create a new chemical inventory document
    const chemicalInventory = new ChemicalInventory({
      chemicalname,
      weight,
      storehouse1,
      storehouse2,
      location_info,
    });

    // Save the document to the database
    const savedInventory = await chemicalInventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add chemical inventory item" });
  }
};
// Controller function to retrieve all chemical inventory data
exports.getAllChemicalInventory = async (req, res) => {
  try {
    const chemicalInventoryList = await ChemicalInventory.find();

    res.status(200).json(chemicalInventoryList);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Could not retrieve chemical inventory data" });
  }
};

// Controller function to retrieve chemical inventory data by ID
exports.getChemicalInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;

    // Find the chemical inventory item by ID
    const inventory = await ChemicalInventory.findById(inventoryId);

    if (!inventory) {
      return res.status(404).json({ error: "Chemical inventory not found" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Could not retrieve chemical inventory data" });
  }
};

// Controller function to update chemical inventory data by ID
exports.updateChemicalInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const { chemicalname, weight, storehouse1, storehouse2, location_info } =
      req.body;

    // Find and update the chemical inventory item by ID
    const updatedInventory = await ChemicalInventory.findByIdAndUpdate(
      inventoryId,
      {
        chemicalname,
        weight,
        storehouse1,
        storehouse2,
        location_info,
      },
      { new: true } // Return the updated document
    );

    if (!updatedInventory) {
      return res.status(404).json({ error: "Chemical inventory not found" });
    }

    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update chemical inventory data" });
  }
};

// Controller function to delete chemical inventory data by ID
exports.deleteChemicalInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;

    // Find and remove the chemical inventory item by ID
    const deletedInventory = await ChemicalInventory.findByIdAndRemove(
      inventoryId
    );

    if (!deletedInventory) {
      return res.status(404).json({ error: "Chemical inventory not found" });
    }

    res.status(204).json(); // No content (successful deletion)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete chemical inventory data" });
  }
};
