import * as PIXI from "pixi.js";
    
// This file is generated. Do not touch.

export let Dumbass: PIXI.Texture;
export let Iguana: PIXI.Texture;
export let Shadow: PIXI.Texture;


export function loadTexturesAsync()
{
    const loader = new PIXI.Loader();

    const DumbassPath = require("../../assets/images/dumbass.png");
    loader.add(DumbassPath); 

    const IguanaPath = require("../../assets/images/iguana.png");
    loader.add(IguanaPath); 

    const ShadowPath = require("../../assets/images/shadow.png");
    loader.add(ShadowPath); 

    
    return new Promise<void>(resolve =>
    {
        loader.load((_, resources) => {
            Dumbass = resources[DumbassPath]?.texture as PIXI.Texture;
            Iguana = resources[IguanaPath]?.texture as PIXI.Texture;
            Shadow = resources[ShadowPath]?.texture as PIXI.Texture;

            resolve();
        });
    });
}