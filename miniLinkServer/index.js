const express = require("express")

const app = express()

const cors = require('cors')

const PORT = process.env.PORT || 4000


const mongoose = require("mongoose");
app.use(cors())


mongoose.connect("mongodb://127.0.0.1:27017/testing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //serverSelectionTimeoutMS: 20000 // Increase timeout to 30 seconds
}).then((result) => {
    console.log("successful connection");
    app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
})
    .catch((error) => console.log("error in connection"));

//reconnect()


const item = require("./models/item"); // Create the Item model

app.get("/api/add-items", (req, res) => {

    console.log("connected to db boss")
    const items = new item({ name: "Valerie", age: "thirty" })

    items.save().then(result => {res.json(items);console.log(items)}).catch(error => console.log(error))

});

app.get("/api/items", (req, res) => {
    console.log("connected to db boss")
    const items = item.find().then(result => res.send(result)).catch(error => console.log("couldnt find stuff"))

});

