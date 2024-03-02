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


//search URL in db to avoid duplicates
app.get("/", (req, res) => {
  // const items = item.find({miniLink:req.query.miniLink}).then(result => console.log("foud "+req.query.miniLink)).catch(error => console.log("couldnt find link "+req.miniLink))
  const items = item.find({ miniLink: req.query.miniLink }).then(result => res.send(result)).catch(error => console.log("couldnt find link " + req.miniLink))
})

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sending long URL to db
app.post("/", (req, res) => {
  const { longURL, miniLink } = req.body;
  const items = new item({ longURL: longURL, miniLink: miniLink })
  items.save().then(console.log("record saved")).catch(err => console.log(err))
})

// route to handle loading of original urls
app.use((req, res) => {
  // Perform actions based on the requested URL
  if (req.url === '/specific-route') {
    // Handle specific route
    res.send('Handling specific route');
  } else {
    // Handle other routes
    res.send('Handling other routes');
  }
});

