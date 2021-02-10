import {Dumbass, Shadow} from "../typedAssets/textures";
import {subimageTextures} from "../utils/pixi/subimageTextures";
import {Container, Sprite} from "pixi.js";
import { DropShadowFilter } from "pixi-filters";
import {SoftBevelFilter} from "../filters/softBevel/SoftBevelFilter";
import {now} from "../utils/now";
import Color from "color";

const colors = ["#ff0000", "#FF8223", "#FFCD44", "#B3D949", "#47C27C", "#5CDBC8", "#30BBDB", "#327BDB", "#8887E5", "#8887E5", "#B270E5", "#F4A6D7", "#F274CE"];

export function devil(seed = Math.floor(Math.random() * 512))
{
    const seedUnit = (seed % 512) / 512;
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

    const color = Color(colors[Math.floor(seedUnit * colors.length)]);
    body.tint = color.rgbNumber();
    const softBevelFilter = new SoftBevelFilter({
        thickness: 2,
        lightColor: color.lighten(0.75).saturate(0.33).rgbNumber(),
        shadowColor: color.saturate(0.75).darken(0.375).rgbNumber()
    });
    console.log(softBevelFilter.lightColor);
    container.filters = [softBevelFilter as any];
    eyes.filters = [ new DropShadowFilter({ color: softBevelFilter.shadowColor, quality: 2, rotation: 150, distance: 3, alpha: 0.3 }) ];
    container.addChild(shadow, body, eyes);

    container.withStep(() => {
        const f = now.s * 3 + seed;
        body.scale.set(1 + Math.sin(f) * 0.05, 1 + Math.cos(-f * 0.9) * 0.05);
        eyes.position.set(0, Math.cos(-f * 1.02) * 2)
    });
    // container.scale.set(.5, .5);

    return container;
}
