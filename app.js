const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

const server = http.createServer();
const wss = new WebSocket.Server({ server, path: "/mqtt" });

wss.on("connection", (ws) => {
  console.log("ESP32 connected");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
    fs.appendFileSync("events.log", msg.toString() + "\n");
    ws.send(JSON.stringify({ status: "ok" }));
  });

  ws.on("close", () => console.log("ESP32 disconnected"));
});

server.listen(process.env.PORT || 8080, () =>
  console.log("Server listening on port", process.env.PORT || 8080)
);
