precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;

uniform float transformX;
uniform float transformY;
uniform vec3 lightColor;
uniform float lightAlpha;
uniform vec3 shadowColor;
uniform float shadowAlpha;

void main(void) {
    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);
    vec2 transform2 = transform * vec2(2);
    vec2 transform3 = transform * vec2(3);
    vec4 color = texture2D(uSampler, vTextureCoord);

    float light = (texture2D(uSampler, vTextureCoord - transform).a
        + texture2D(uSampler, vTextureCoord - transform2).a) / 2.0;
    float shadow = (texture2D(uSampler, vTextureCoord + transform).a
        + texture2D(uSampler, vTextureCoord + transform2).a) / 2.0;

//    float light = (texture2D(uSampler, vTextureCoord - transform).a
//        + texture2D(uSampler, vTextureCoord - transform2).a
//        + texture2D(uSampler, vTextureCoord - transform3).a) / 3.0;
//    float shadow = (texture2D(uSampler, vTextureCoord + transform).a
//        + texture2D(uSampler, vTextureCoord + transform2).a
//        + texture2D(uSampler, vTextureCoord + transform3).a) / 3.0;

    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));
    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));
    gl_FragColor = vec4(color.rgb * color.a, color.a);
}
