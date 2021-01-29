import WebSocket, {Server} from "ws";

const port = Number(process.env.port || 6969);
const wss = new Server({ port });

let id = 0;

wss.on("connection", (socket, req) => {
    console.log(req.socket.remoteAddress, "connected");
    sendMessage(socket, "login", { id: id++ });
});

console.log(`...Started on port ${port}`);

function sendMessage(socket: WebSocket, type: string, data: { })
{
    sendJson(socket, { type, ...data });
}

function sendJson(socket: WebSocket, data: any)
{
    socket.send(JSON.stringify(data));
}
