const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getuserData} = require("../controllers/userController")
const {protect} = require("../middleware/authMiddleware")


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getuserData)

module.exports = router