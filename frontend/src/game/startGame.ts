import {createGame} from "../utils/asshat/createGame";
import {BitmapText, Graphics, Sprite} from "pixi.js";
import {now} from "../utils/now";
import {Key} from "../utils/browser/key";
import {AcrobatixFont} from "../typedAssets/fonts";
import {Iguana} from "../typedAssets/textures";
import {CratePickup} from "../typedAssets/sounds";
import {integralUpscaleCanvas} from "../utils/browser/integralUpscaleCanvas";
import {KeyTypeListener} from "./keyTypeListener";
import {client} from "./devilClient";
import {devil} from "./devil";

const startGame = createGame({width: 320, height: 240, targetFps: 60});
startGame.canvasElement.id = "gameCanvas";
document.body.appendChild(startGame.canvasElement);
integralUpscaleCanvas(startGame.canvasElement, 20);

const lines = new Graphics()
    .beginFill(0x0000ff)
    .drawRect(0, 0, 640, 480);

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

startGame.stage.addChild(lines, circle, iguana, bitmapText, typeListener, devil().at(100, 100));

client.login();
