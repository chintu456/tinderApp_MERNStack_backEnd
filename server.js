import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:8OCiPzPza0kCOuVK@cluster0.f0muj.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Cofnig tinder admin password 8OCiPzPza0kCOuVK
mongoose.connect(connection_url, {
  //the following is always assumed to be true: check https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
});

//API endpoints
app.get("/", (req, res) => res.status(200).send("Hello CPI bhaiya"));

app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;
  //   const { name, imgUrl } = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/card", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
