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
// route to handle loading of original urls
app.use((req, res) => {
 
  // Check if the requested URL is not home page
  if (req.url !== '/') {
    // const items = item.find({ miniLink: req.query.miniLink }).then(result => res.send(result)).catch(error => console.log(error))
    console.log(clientLink+req.url)
    const items = item.find({ miniLink: clientLink+req.url}).then(result => {console.log(result);res.send(result)}).catch(error => console.log("error "+error))
  }
  
});

//search URL in db to avoid duplicates
app.get("/", (req, res) => {
  const items = item.find({ miniLink: req.query.miniLink }).then(result => res.send(result)).catch(error => console.log(error))
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






