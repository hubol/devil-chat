import {Dumbass, Shadow} from "../typedAssets/textures";
import {subimageTextures} from "../utils/pixi/subimageTextures";
import {Container, Sprite} from "pixi.js";
import { BevelFilter, DropShadowFilter } from "pixi-filters";
import {SoftBevelFilter} from "../filters/softBevel/SoftBevelFilter";
import {now} from "../utils/now";

export function devil()
{
    const textures = subimageTextures(Dumbass, 2);
    const container = new Container();

    const shadow = Sprite.from(Shadow);
    shadow.anchor.set(0.5, 0.6);
    shadow.width = textures[0].width * 1.3;

    const [body, eyes] = textures.map(x => {
        const sprite = Sprite.from(x);
        sprite.anchor.set(0.5, 1);
        return sprite;
    });

    body.tint = 0xff0000;
    container.filters = [ new SoftBevelFilter({ thickness: 2, lightColor: 0xFFA5AC, shadowColor: 0x99001A }) ];
    eyes.filters = [ new DropShadowFilter({ color: 0x99001A, quality: 2, rotation: 150, distance: 3, alpha: 0.3 }) ];
    container.addChild(shadow, body, eyes);

    container.withStep(() => {
        const f = now.s * 3;
        body.scale.set(1 + Math.sin(f) * 0.05, 1 + Math.cos(-f * 0.9) * 0.05);
        eyes.position.set(0, Math.cos(-f * 1.02) * 2)
    });
    // container.scale.set(.5, .5);

    return container;
}
