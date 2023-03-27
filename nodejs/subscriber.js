const express = require('express');
const redis = require("redis");

const port = process.env.PORT || 3000;
const products = []

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});
redisClient.connect();

const app = express();

app.get("/", (req, res) => {
  res.send("hello subscribe redis from port " + port)
})

const channel = "test";
redisClient.subscribe(channel, (message) => {
  console.log(message); 
  products.push(message);
});


app.get("/sub", (req, res) => {
  console.log("subscribe " + products);
  res.send("subscribe " + JSON.stringify(products))
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});