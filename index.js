import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherstack.com";
const API_KEY = "1884226f446d8337b2b4dbb3a54f35f9";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs", {weather: null, error: null});
  });

app.post("/", async (req, res) => {
  const city = req.body.city;
  let newStr = city.replace(/ /g, "+");
  try {
    const response = await axios.get(`http://api.weatherstack.com/current?access_key=1884226f446d8337b2b4dbb3a54f35f9&query=${newStr}`);
    const result = response.data;
    res.render("index.ejs", { weather: result, error: null });
  } catch (error) {
    res.render("index.ejs", {weather: null, error: error.message});
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  