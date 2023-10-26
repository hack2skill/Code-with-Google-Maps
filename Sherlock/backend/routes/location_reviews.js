const router = require("express").Router();
const { addreview, getreviews } = require('../controllers/location_reviews')

router.post('/add_review', addreview)
router.post('/get_review', getreviews)

module.exports = router;