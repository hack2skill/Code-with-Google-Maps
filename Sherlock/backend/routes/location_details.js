const router = require("express").Router();
const { getlocationdetails, getroutesafetyscores } = require('../controllers/location_details')

router.post('/get_locationdetail', getlocationdetails)

router.post('/get_routesafetyscores', getroutesafetyscores)

module.exports = router;