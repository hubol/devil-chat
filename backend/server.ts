import {Server} from "ws";

const port = Number(process.env.port || 6969);

const wss = new Server({ port });
wss.on("connection", socket => {
    console.log(socket, "connected");
    socket.on("close", () => {
        console.log(socket, "closed");
    });
});

console.log(`...Started on port ${port}`);
