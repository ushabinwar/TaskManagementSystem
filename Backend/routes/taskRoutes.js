const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleware/auth");
const { createTask, getAllTask, getOneTask, updateTask, deleteTask } = require("../controllers/taskControllers");

router.post("/create", isAuthenticated, createTask)

router.get("/alltasks", isAuthenticated, getAllTask)

router.get("/task/:id", isAuthenticated, getOneTask)

router.post("/update/:id", isAuthenticated, updateTask)

router.get("/delete/:id", isAuthenticated, deleteTask)
module.exports = router;