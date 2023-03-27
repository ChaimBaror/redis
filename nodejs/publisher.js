const express = require('express');
const redis = require("redis");

const port = process.env.PORT || 3000;

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});
redisClient.on("error", (error) => console.error(`Error : ${error}`));
redisClient.connect();

const app = express();

app.get("/", (req, res) => {
  console.log("request at URL index node")
  res.send("hello published from port " + port)
})

app.get("/pub", (req, res) => {
  console.log("request index pub")
  const channel = "test"
  let message ={id:Date.now(), "Nodejs : ": 'js'};
  redisClient.publish(channel, JSON.stringify(message));
  res.send("Published Event Using Redis");

})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});