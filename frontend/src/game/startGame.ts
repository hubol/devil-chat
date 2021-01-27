import {createGame} from "../utils/asshat/createGame";
import {BitmapText, Graphics, Sprite} from "pixi.js";
import {now} from "../utils/now";
import {Key} from "../utils/browser/key";
import {AcrobatixFont} from "../typedAssets/fonts";
import {Iguana} from "../typedAssets/textures";
import {CratePickup} from "../typedAssets/sounds";
import {integralUpscaleCanvas} from "../utils/browser/integralUpscaleCanvas";
import {KeyTypeListener} from "./keyTypeListener";

const startGame = createGame({width: 640, height: 480, targetFps: 60});
startGame.canvasElement.id = "gameCanvas";
document.body.appendChild(startGame.canvasElement);
integralUpscaleCanvas(startGame.canvasElement, 20);

const lines = new Graphics()
    .withStep(() => {
        lines.lineStyle(1, 0x808080);
        if (Math.random() > 0.9)
            lines.clear();
        const x = startGame.width * (Math.sin(now.ms * 0.125) + 1) / 2;
        const y = startGame.height * (Math.cos(now.ms * 0.5) + 1) / 2;
        lines.lineTo(x, y);
    });

const circle = new Graphics()
    .withStep(() => {
        if (Key.isDown("Space"))
        {
            circle.x += 8;
            circle.y += 8;
        }
        else if (Key.isDown("Backspace"))
        {
            circle.x -= 4;
            circle.y -= 4;
        }

        circle
            .clear()
            .beginFill((circle.x / startGame.width) * 0xffff00 + 0x0000ff)
            .drawCircle(0, 0, 32)
    });

const iguana = new Sprite(Iguana)
    .at(320, 240)
    .withStep(() => {
        if (Key.isDown("ArrowRight"))
            iguana.x += 1;
        if (Key.justWentDown("Space"))
            CratePickup.play();
        if (Key.isDown("KeyS"))
            iguana.scale.x *= 1.1;
    });

const typeListener = new KeyTypeListener({ newlines: "none" });

const bitmapText = new BitmapText("Welcome, special agent Sylvie.", { fontName: AcrobatixFont.font })
    .withStep(() => {
        if (typeListener.string.length > 0)
            bitmapText.text = typeListener.stringWithCursor;
    });

startGame.stage.addChild(lines, circle, iguana, bitmapText, typeListener);

const webSocket = new WebSocket('ws://localhost:6969');
webSocket.onmessage = ev => {
    console.log(ev);
};
