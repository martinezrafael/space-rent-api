require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

app.listen(process.env.PORT, () =>
    console.log(`Server running on PORT: ${process.env.PORT}`)
);
