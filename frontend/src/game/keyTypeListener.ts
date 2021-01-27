import {Container} from "pixi.js";

export class KeyTypeListener extends Container
{
    constructor() {
        super();

        document.addEventListener("keydown", this.handleKeyTyped);
        this.on("removed", () => document.removeEventListener("keydown", this.handleKeyTyped));
    }

    private _typedString = "";

    handleKeyTyped = (event: KeyboardEvent) =>
    {
        switch (event.code.toLowerCase())
        {
            case "enter":
                this._typedString += '\n';
                return;
            case "backspace":
                this._typedString = this._typedString.substring(0, this._typedString.length - 1);
                return;
            case "tab":
                this._typedString += '  ';
                return;
        }

        switch (event.key)
        {
            case "Dead":
            case "Alt":
            case "NumLock":
            case "Shift":
            case "ScrollLock":
            case "Pause":
            case "Insert":
            case "Delete":
            case "Home":
            case "End":
            case "PageUp":
            case "PageDown":
            case "Escape":
            case "CapsLock":
            case "Meta":
            case "ContextMenu":
                return;
            default:
                this._typedString += event.key;
        }
    }

    get string()
    {
        return this._typedString;
    }
}
