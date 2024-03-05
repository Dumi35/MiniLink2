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


const item = require("./models/item"); // Create the Item model

const clientLink = `http://localhost:3000`

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Search URL in db to avoid duplicates
app.get("/", (req, res) => {
  const { miniLink } = req.query;
  if (miniLink===""){
    return
  }
  item.find({ miniLink })
    .then(result => res.send(result))
    .catch(error => console.log(error));
});

// Sending long URL to db
app.post("/", (req, res) => {
  const { longURL, miniLink } = req.body;
  const newItem = new item({ longURL, miniLink });
  newItem.save()
    .then(() => {
      console.log("Record saved");
      res.send("Record saved"); // Respond to the client after saving
    })
    .catch(err => console.log(err));
});

// Route to handle loading of original urls
app.get("*", (req, res) => {
  console.log("Requested URL: " + req.url);
  // Check if the requested URL is not the home page
  if (req.url !== '/') {
    const { url } = req;
    const miniLink = clientLink + url;
    item.find({ miniLink })
      .then(result => {
        console.log(result);
        res.send(result);
      })
      .catch(error => console.log("error " + error));
  }
});







