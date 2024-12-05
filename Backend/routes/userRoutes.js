const express = require("express");
const { homePage, registerUser, loginUser, profile, logoutUser } = require("../controllers/userControllers");
const router = express.Router();
const {isAuthenticated} = require("../middleware/auth")


router.get("/", homePage)

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/logout", isAuthenticated, logoutUser)



module.exports = router;
