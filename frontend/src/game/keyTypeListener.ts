import {Container} from "pixi.js";

export class KeyTypeListener extends Container
{
    constructor() {
        super();

        document.addEventListener("keydown", this.handleKeyTyped);
        this.on("removed", () => document.removeEventListener("keydown", this.handleKeyTyped));

        this.withStep(() => {
            if (this._cursorTimer++ > 15)
            {
                this._showCursor = !this._showCursor;
                this._cursorTimer = 0;
            }
        })
    }

    private _showCursor = false;
    private _cursorTimer = 0;
    private _typedString = "";

    handleKeyTyped = (event: KeyboardEvent) =>
    {
        this._showCursor = true;
        this._cursorTimer = 0;

        switch (event.code.toLowerCase())
        {
            case "enter":
                this._typedString += '\n';
                return;
            case "backspace":
                this._typedString = this._typedString.slice(0, -1);
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
            case "Control":
            case "ArrowUp":
            case "ArrowLeft":
            case "ArrowDown":
            case "ArrowRight":
                return;
            default:
                this._typedString += event.key;
        }
    }

    get string()
    {
        return this._typedString;
    }

    get stringWithCursor()
    {
        const cursor = String.fromCharCode(127);
        if (this._showCursor)
            return `${this.string}${cursor}`;
        return this.string;
    }
}
