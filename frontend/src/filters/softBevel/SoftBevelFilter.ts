// @ts-ignore
import vertex from '../default.vert';
// @ts-ignore
import fragment from './bevel.frag';
import {Filter} from '@pixi/core';
import {DEG_TO_RAD} from '@pixi/math';
import {rgb2hex, hex2rgb} from '@pixi/utils';

/**
 * Bevel Filter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/bevel.png)
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-bevel|@pixi/filter-bevel}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 * @param {object} [options] - The optional parameters of the filter.
 * @param {number} [options.rotation = 45] - The angle of the light in degrees.
 * @param {number} [options.thickness = 2] - The tickness of the bevel.
 * @param {number} [options.lightColor = 0xffffff] - Color of the light.
 * @param {number} [options.lightAlpha = 0.7] - Alpha of the light.
 * @param {number} [options.shadowColor = 0x000000] - Color of the shadow.
 * @param {number} [options.shadowAlpha = 0.7] - Alpha of the shadow.
 */
export class SoftBevelFilter extends Filter {
    uniforms;

    constructor(options: any = {}) {
        super(vertex, fragment);

        this.uniforms.lightColor = new Float32Array(3);
        this.uniforms.shadowColor = new Float32Array(3);

        options = Object.assign({
            rotation: 45,
            thickness: 2,
            lightColor: 0xffffff,
            lightAlpha: 0.7,
            shadowColor: 0x000000,
            shadowAlpha: 0.7,
        }, options);

        /**
         * The angle of the light in degrees.
         * @member {number}
         * @default 45
         */
        this.rotation = options.rotation;

        /**
         * The tickness of the bevel.
         * @member {number}
         * @default 2
         */
        this.thickness = options.thickness;

        /**
         * Color of the light.
         * @member {number}
         * @default 0xffffff
         */
        this.lightColor = options.lightColor;

        /**
         * Alpha of the light.
         * @member {number}
         * @default 0.7
         */
        this.lightAlpha = options.lightAlpha;

        /**
         * Color of the shadow.
         * @member {number}
         * @default 0x000000
         */
        this.shadowColor = options.shadowColor;

        /**
         * Alpha of the shadow.
         * @member {number}
         * @default 0.7
         */
        this.shadowAlpha = options.shadowAlpha;

        // Workaround: https://github.com/pixijs/pixi-filters/issues/230
        // applies correctly only if there is at least a single-pixel padding with alpha=0 around an image
        // To solve this problem, a padding of 1 put on the filter should suffice
        this.padding = 1;
    }

    padding;
    _thickness;
    _angle;

    /**
     * Update the transform matrix of offset angle.
     * @private
     */
    _updateTransform() {
        this.uniforms.transformX = this._thickness * Math.cos(this._angle);
        this.uniforms.transformY = this._thickness * Math.sin(this._angle);
    }

    get rotation() {
        return this._angle / DEG_TO_RAD;
    }
    set rotation(value) {
        this._angle = value * DEG_TO_RAD;
        this._updateTransform();
    }

    get thickness() {
        return this._thickness;
    }
    set thickness(value) {
        this._thickness = value;
        this._updateTransform();
    }

    get lightColor() {
        return rgb2hex(this.uniforms.lightColor);
    }
    set lightColor(value) {
        hex2rgb(value, this.uniforms.lightColor);
    }

    get lightAlpha() {
        return this.uniforms.lightAlpha;
    }
    set lightAlpha(value) {
        this.uniforms.lightAlpha = value;
    }

    get shadowColor() {
        return rgb2hex(this.uniforms.shadowColor);
    }
    set shadowColor(value) {
        hex2rgb(value, this.uniforms.shadowColor);
    }

    get shadowAlpha() {
        return this.uniforms.shadowAlpha;
    }
    set shadowAlpha(value) {
        this.uniforms.shadowAlpha = value;
    }
}
