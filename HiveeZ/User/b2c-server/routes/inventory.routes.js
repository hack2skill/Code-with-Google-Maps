const express = require("express");
const {
  addChemicalInventory,
  getChemicalInventory,
  updateChemicalInventory,
  deleteChemicalInventory,
  getAllChemicalInventory,
} = require("../controllers/inventory.controller");

const router = express.Router();

router.post("/add", addChemicalInventory);
router.get("/all", getAllChemicalInventory);
router.get("/:id", getChemicalInventory);
router.put("/:id", updateChemicalInventory);
router.delete("/:id", deleteChemicalInventory);

module.exports = router;
