const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    5000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD"
    );
    socket.emit("FromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));