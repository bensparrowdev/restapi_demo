require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
            })
        console.log("successfully connected to db")
    }
    catch (error) {
        console.log(error);
    }
}

connection();