require("./db/connection");
const express = require("express");

const port = process.env.PORT || 5000

const app = express()

app.listen(5000, () => {
    console.log(`Server listening on port ${port}`);
})