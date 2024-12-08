const express = require("express");
const app = express();
require("dotenv").config({path:"./.env"})
const connectToDb = require("./db/db")
connectToDb();


//logger
const logger = require("morgan")
app.use(logger("tiny"));

// bodyparser it activate req.body
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// session and cookie
const session = require("express-session");
const cookieparser =  require("cookie-parser")
app.use(
    session({
        resave:true,
        saveUninitialized:true,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(cookieparser());

app.use("/" , require("./routes/userRoutes"))
app.use("/task" , require("./routes/taskRoutes"))

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})