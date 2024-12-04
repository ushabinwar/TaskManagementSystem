const express = require("express");
const app = express();
require("dotenv").config({path:"./.env"})
const connectToDb = require("./db/db")
connectToDb();

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})