import {devilEnvironment} from "./devilEnvironment";
import {game} from "./game";

class DevilClient
{
    private readonly webSocket: WebSocket;

    constructor() {
        this.webSocket = new WebSocket(devilEnvironment.webSocketUrl);
        this.webSocket.onmessage = ev => this.handleMessageData(JSON.parse(ev.data));
    }

    private handleMessageData(data: any)
    {
        console.log(data);
        switch (data?.type)
        {
            case "login":
                game.login(data.id);
                return;
        }
    }

    login()
    {
        // this.webSocket.sendJson({ method: "login" });
    }

    get connectionStatus()
    {
        switch (this.webSocket.readyState)
        {
            case WebSocket.CONNECTING:
                return "connecting";
            case WebSocket.CLOSED:
                return "closed";
            case WebSocket.CLOSING:
                return "closing";
            case WebSocket.OPEN:
                return "open";
            default:
                return "unknown";
        }
    }
}

export const client = new DevilClient();
