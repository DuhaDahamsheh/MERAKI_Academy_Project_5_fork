
const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

//routers

const rolesRouter =require("./routes/roles");
const permissionsRouter = require("./routes/permissions");
const app = express();

//built-in middleware
app.use(express.json());
app.use(cors());


// router middleware
app.use("/roles" ,rolesRouter)
app.use("/permissions" ,permissionsRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});

