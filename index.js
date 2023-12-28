import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://api.weatherstack.com";
const API_KEY = "1884226f446d8337b2b4dbb3a54f35f9";

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/", async (req, res) => {
  const city = req.body.city;
  try {
    const params = {
      access_key: '1884226f446d8337b2b4dbb3a54f35f9',
      query: city
    }
    const response = await axios.get(`http://api.weatherstack.com/current`, {params});
    const result = response.data;
    res.render("index.ejs", { weather: result.data });
  } catch (error) {
    res.render("index.ejs", {error: error.message});
  }
});




// const params = {
//   access_key: '1884226f446d8337b2b4dbb3a54f35f9',
//   query: 'New York'
// }

// axios.get('https://api.weatherstack.com/current', {params})
//   .then(response => {
//     const apiResponse = response.data;
//     console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
//   }).catch(error => {
//     console.log(error);
//   });




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  