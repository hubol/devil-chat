import {Dumbass, Shadow} from "../typedAssets/textures";
import {subimageTextures} from "../utils/pixi/subimageTextures";
import {Container, Sprite} from "pixi.js";

export function devil()
{
    const textures = subimageTextures(Dumbass, 2);
    const container = new Container();

    const shadow = Sprite.from(Shadow);
    shadow.anchor.set(0.5, 0.6);
    shadow.width = textures[0].width * 1.3;

    const sprites = textures.map(x => {
        const sprite = Sprite.from(x);
        sprite.anchor.set(0.5, 1);
        return sprite;
    });

    sprites[0].tint = 0xff0000;
    container.addChild(shadow, sprites[0], sprites[1]);

    return container;
}
