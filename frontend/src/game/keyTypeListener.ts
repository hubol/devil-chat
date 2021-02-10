import {Container} from "pixi.js";

type KeyTypeListenerNewlines = "none";

export class KeyTypeListener extends Container
{
    constructor(args : { newlines: KeyTypeListenerNewlines }) {
        super();

        document.addEventListener("keydown", this.handleKeyTyped);
        this.on("removed", () => document.removeEventListener("keydown", this.handleKeyTyped));
        this.newlines = args.newlines;

        this.withStep(() => {
            if (this._cursorTimer++ > 15)
            {
                this._showCursor = !this._showCursor;
                this._cursorTimer = 0;
            }
        })
    }

    private readonly newlines: KeyTypeListenerNewlines;

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
                if (this.newlines !== "none")
                    this._typedString += '\n';
                return;
            case "backspace":
                this._typedString = this._typedString.slice(0, -1);
                return;
            case "tab":
                this._typedString += '  ';
                return;
        }

        if (event.key.length === 1)
            this._typedString += event.key;
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
