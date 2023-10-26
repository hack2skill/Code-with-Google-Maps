const router = require("express").Router();
const { getlocationdetails } = require('../controllers/location_details')

router.post('/get_locationdetail', getlocationdetails)

module.exports = router;