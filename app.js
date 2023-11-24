const express = require("express");
require("./db/mongoose");
const contactrouter = require("./routers/contact");

const app = express();

app.use(express.json());
app.use(contactrouter);

module.exports = app;
